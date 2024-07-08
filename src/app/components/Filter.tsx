"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type IssueState = "OPEN" | "CLOSED";

// This component provides a filter for switching between open and closed issues
// It's a client-side component, as indicated by the "use client" directive

// We use React's useState hook to manage the selected state locally
// This allows for immediate UI updates when the user switches filters

// The useRouter hook from Next.js is used for client-side navigation
// When a filter is selected, we update the URL, triggering a new server-side render with the new state

// We provide visual feedback to the user about which filter is currently active
// Each button is disabled when it represents the current state
// This prevents unnecessary re-renders and provides a better user experience

const Filter = () => {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState<IssueState>("OPEN");

  const handleFilterChange = (newState: IssueState) => {
    setSelectedState(newState);
    router.push(`/?state=${newState}`);
  };

  return (
    <div className="flex space-x-2 mb-4">
      <button
        className={`px-3 py-1 rounded ${
          selectedState === "OPEN"
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => handleFilterChange("OPEN")}
        disabled={selectedState === "OPEN"}
      >
        Open
      </button>
      <button
        className={`px-3 py-1 rounded ${
          selectedState === "CLOSED"
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => handleFilterChange("CLOSED")}
        disabled={selectedState === "CLOSED"}
      >
        Closed
      </button>
    </div>
  );
};

export default Filter;
