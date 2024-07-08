import { gql } from "@apollo/client";

export const GET_ISSUES = gql`
  query GetIssues(
    $owner: String!
    $name: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
    $state: [IssueState!]
  ) {
    repository(owner: $owner, name: $name) {
      issues(
        first: $first
        last: $last
        after: $after
        before: $before
        states: $state
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        nodes {
          id
          title
          url
          createdAt
          author {
            login
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;
