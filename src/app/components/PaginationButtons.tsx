"use client";

import Link from "next/link";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

interface PaginationButtonsProps {
  nextCursor: string;
  prevCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  issueState: string;
}

// The component receives props that determine the visibility and behavior of the buttons
// This allows for dynamic rendering based on the current pagination state

export default function PaginationButtons({
  nextCursor,
  prevCursor,
  hasPreviousPage,
  hasNextPage,
  issueState,
}: PaginationButtonsProps) {
  const buttonStyles =
    "px-6 sm:px-12 py-2 text-blue-600 outline outline-blue-600 rounded hover:bg-slate-200 flex items-center justify-center";

  return (
    <div className="mt-4 flex justify-center space-x-6">
      {/* Render Previous button if there's a previous page */}
      {hasPreviousPage && (
        <Link
          href={`/?state=${issueState}&cursor=${prevCursor}&direction=previous`}
          className={buttonStyles}
        >
          <ChevronLeftIcon className="w-5 mr-2" />
          <p>Previous</p>
        </Link>
      )}
      {/* Render Next button if there's a next page */}
      {hasNextPage && (
        <Link
          href={`/?state=${issueState}&cursor=${nextCursor}&direction=next`}
          className={buttonStyles}
        >
          <p>Next</p>
          <ChevronRightIcon className="w-5 ml-2" />
        </Link>
      )}
    </div>
  );
}
