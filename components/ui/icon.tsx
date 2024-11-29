"use client";

import React, { useState, useEffect, useMemo } from "react";
import DOMPurify from "dompurify";

interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  url: string;
}

export const Icon: React.FC<CustomIconProps> = ({
  url,
  className = "",
  ...props
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch SVG");
        const svgText = await response.text();
        // Sanitize SVG content to avoid risks
        const sanitizedSvg = DOMPurify.sanitize(svgText);
        setSvgContent(sanitizedSvg);
      } catch (err) {
        setError("Error loading icon");
        console.error("Error fetching SVG:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSvg();
  }, [url]);

  const SvgComponent = useMemo(() => {
    if (!svgContent) return null;
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    return (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        {...props}
        viewBox={svgElement.getAttribute("viewBox") || "0 0 24 24"}
      >
        {Array.from(svgElement.children).map((child, index) => {
          const Clone = React.cloneElement(
            child as unknown as React.ReactElement,
            {
              key: index,
            }
          );
          return Clone;
        })}
      </svg>
    );
  }, [svgContent]);

  if (isLoading) {
    return <span className="loading">Loading...</span>;
  }

  if (error) {
    return <span className="error">{error}</span>;
  }

  if (!SvgComponent) {
    return null;
  }

  return (
    <SvgComponent
      className={`inline-block ${className}`}
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
};
