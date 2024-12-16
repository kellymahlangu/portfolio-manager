"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Stack } from "@/app/types";

interface MultiSelectProps {
  options: Stack[];
  selected: number[];
  onChange: (selected: number[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (id: number) => {
    onChange(selected.filter((i) => i !== id));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex min-h-[40px] w-full flex-wrap items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          {selected.length > 0 && options ? (
            <div className="flex flex-wrap gap-1">
              {selected.map((id) => {
                const item = options.find((option) => option.id === id);
                return item ? (
                  <Badge
                    key={item.id}
                    variant="secondary"
                    className="mr-1 mb-1"
                  >
                    {item.name}
                    <button
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUnselect(item.id);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={() => handleUnselect(item.id)}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </Badge>
                ) : null;
              })}
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options?.map((option) => (
              <CommandItem
                key={option.id}
                onSelect={() => {
                  onChange(
                    selected.includes(option.id)
                      ? selected.filter((item) => item !== option.id)
                      : [...selected, option.id]
                  );
                  setOpen(true);
                }}
              >
                <div
                  className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${
                    selected.includes(option.id)
                      ? "bg-primary text-primary-foreground"
                      : "opacity-50"
                  }`}
                >
                  {selected.includes(option.id) && <X className="h-4 w-4" />}
                </div>
                {option.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
