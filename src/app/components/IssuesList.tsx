import { GET_ISSUES } from "../lib/get-issues";
import { getClient } from "../lib/apollo-client";
import Filter from "./Filter";
import PaginationButtons from "./PaginationButtons";
import { StopCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface IssuesListProps {
  searchParams: {
    state?: string;
    cursor?: string | null;
    direction?: string;
  };
}

interface Issue {
  id: string;
  title: string;
  url: string;
  createdAt: string;
  author: {
    login: string;
  };
}

// This component fetches and displays a list of issues from the React.js repository
// It uses Apollo Client to query the GitHub GraphQL API

// The component is designed to be server-side rendered

// We use the searchParams to handle pagination and filtering:
// - state: determines whether to show open or closed issues
// - cursor: used for cursor-based pagination
// - direction: determines whether we're going to the next or previous page

// The GraphQL query is constructed dynamically based on the pagination direction
// This allows for efficient data fetching in both forward and backward pagination

// Each issue is rendered as a list item with a consistent style
// We use Heroicons for the visual indicators and Next.js Link for external links

// The PaginationButtons component is used to handle navigation between pages
// We pass it the necessary information from the GraphQL query results

export default async function IssuesList({ searchParams }: IssuesListProps) {
  const PAGE_SIZE = 15;
  const issueState = searchParams.state || "OPEN";
  const cursor = searchParams.cursor || null;
  const direction = searchParams.direction || "next";

  // Fetch issues data using Apollo Client

  // We set a new parameter in the url, whenever a user taps on the previous or next button
  // We check which button was clicked through the url params and then we assign the payload's cursor to the after or before value
  // We do this so we know which page to fetch, the next or the previous one
  // We need the before cursor and last parameter in order to be able to also go backwards in our pagination
  const client = getClient();
  const { data } = await client.query({
    query: GET_ISSUES,
    variables: {
      owner: "reactjs",
      name: "reactjs.org",
      first: direction === "next" ? PAGE_SIZE : null,
      last: direction === "previous" ? PAGE_SIZE : null,
      after: direction === "next" ? cursor : null,
      before: direction === "previous" ? cursor : null,
      state: issueState,
    },
  });

  const issues = data.repository.issues.nodes;
  const pageInfo = data.repository.issues.pageInfo;

  return (
    <>
      <Filter />
      <ul>
        {issues.map((issue: Issue) => (
          <li key={issue.id} className="border hover:bg-gray-200 p-2">
            <div className="flex">
              <StopCircleIcon className="w-5 mr-2" />
              <Link
                href={issue.url}
                className="text-gray-800 hover:underline font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                {issue.title}
              </Link>
            </div>
            <p className="text-sm text-gray-600">
              Created by {issue.author.login} on{" "}
              {new Date(issue.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
      <PaginationButtons
        nextCursor={pageInfo.endCursor}
        prevCursor={pageInfo.startCursor}
        hasPreviousPage={pageInfo.hasPreviousPage}
        hasNextPage={pageInfo.hasNextPage}
        issueState={issueState}
      />
    </>
  );
}
