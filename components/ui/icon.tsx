"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export interface CustomIconProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  size?: number;
}

export function CustomIcon({
  src,
  alt = "",
  size = 24,
  className,
  ...props
}: CustomIconProps) {
  return (
    <div
      className={cn("relative inline-block", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <Image src={src} alt={alt} fill className="object-contain" />
    </div>
  );
}
