"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

function generatePageNumbers(currentPage: number, totalPages: number) {
  const pageNumbers = [];
  const maxVisiblePages = 7;

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  pageNumbers.push(1);

  if (currentPage > 3) {
    pageNumbers.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  if (currentPage < totalPages - 2) {
    pageNumbers.push("...");
  }

  pageNumbers.push(totalPages);

  return pageNumbers;
}

interface ListPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

export default function ListPagination({
  totalItems,
  itemsPerPage,
  currentPage,
}: ListPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  return (
    <nav
      className="flex items-center justify-center space-x-2 mt-8"
      aria-label="Pagination"
    >
      {currentPage > 1 && (
        <Link
          href={createPageURL(currentPage - 1)}
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      )}
      {pageNumbers.map((pageNumber, index) =>
        pageNumber === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 py-1">
            <MoreHorizontal
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        ) : (
          <Link
            key={pageNumber}
            href={createPageURL(pageNumber)}
            className={`px-3 py-1 rounded-md ${
              currentPage === pageNumber
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            aria-current={currentPage === pageNumber ? "page" : undefined}
          >
            {pageNumber}
          </Link>
        )
      )}
      {currentPage < totalPages && (
        <Link
          href={createPageURL(currentPage + 1)}
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      )}
    </nav>
  );
}
