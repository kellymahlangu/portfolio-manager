import { useEffect, useRef, useState } from "react";

export type SelectOption = {
  label: string;
  value: string | number;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export function CustomSelect({
  multiple,
  value,
  onChange,
  options,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function clearOptions() {
    if (multiple) {
      onChange([]);
      return;
    }
    onChange(undefined);
  }

  function selectOption(option: SelectOption) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option === value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options]);

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className="relative w-80 min-h-[1.5em] border border-gray-500 flex items-center gap-2 p-2 rounded outline-none focus:border-blue-500"
    >
      <span className="flex-grow flex gap-2 flex-wrap">
        {multiple
          ? value.map((v) => (
              <button
                key={v.value}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v);
                }}
                className="flex items-center border border-gray-500 rounded p-1 gap-1 cursor-pointer focus:bg-red-100 hover:bg-red-100 focus:border-red-500 hover:border-red-500"
              >
                {v.label}
                <span className="text-xl text-gray-500">&times;</span>
              </button>
            ))
          : value?.label}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className="bg-none text-gray-500 border-none outline-none cursor-pointer p-0 text-xl hover:text-gray-800 focus:text-gray-800"
      >
        &times;
      </button>
      <div className="bg-gray-500 self-stretch w-[0.05em]"></div>
      <div className="translate-y-[25%] border-[0.25em] border-transparent border-t-gray-500"></div>
      <ul
        className={`absolute m-0 p-0 list-none max-h-60 overflow-y-auto border border-gray-500 rounded w-full left-0 top-[calc(100%_+_0.25em)] bg-white z-50 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={option.value}
            className={`p-1 cursor-pointer ${
              isOptionSelected(option)
                ? "bg-blue-300"
                : index === highlightedIndex
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
