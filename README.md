# Homelike Assignment - Frontend Software Developer

## Project Overview

Implement a small client application using Next.js and the GitHub GraphQL API.

## Tasks

1. Fetch and display a list of issues from the [React.js repo](https://github.com/reactjs/reactjs.org/issues)
2. Paginate through issues using cursor-based pagination
3. Filter issues by state (open or closed)

## Technology Stack

- Next.js
- TypeScript
- Apollo Client
- GraphQL
- Tailwind CSS
- Unit testing with Jest

## Project Structure and Implementation Details

### 1. Apollo Client Setup (`apollo-client.ts`)

I set up Apollo Client to interact with GitHub's GraphQL API. This allowed me to efficiently fetch data from the API and manage the application's state. I created a new GitHub Access Token to authenticate the requests.

### 2. GraphQL Query (`get-issues.ts`)

I defined a GraphQL query to fetch issues from the React.js repository. The query is designed for:

- Filtering by issue state (open/closed)
- Cursor-based pagination (for both forward and backward navigation)
- Fetching relevant issue details (title, author, creation date, etc.)

### 3. Main Components

#### a. IssuesList (`IssuesList.tsx`)

This is the core component of the application. It:

- Fetches issues data using Apollo Client
- Handles pagination logic
- Renders the list of issues
- Integrates the Filter and PaginationButtons components

I implemented this as an async server component to leverage server-side rendering for improved performance and SEO.

#### b. Filter (`Filter.tsx`)

This client-side component allows users to switch between viewing open and closed issues. It uses React's useState hook for local state management and Next.js's useRouter for client-side navigation.

#### c. PaginationButtons (`PaginationButtons.tsx`)

This component renders the "Previous" and "Next" buttons for pagination. It receives props that determine the visibility and behavior of these buttons based on the current pagination state.

### 4. Styling

I used Tailwind CSS for styling the components. I chose Tailwind because I really love it and I know that you also use it at Homelike. It allows for rapid development of a responsive and visually consistent UI.

### 5. Testing

I implemented some basic unit tests using Jest and React Testing Library. I focused on:

- Mocking the IssuesList component due to its async nature
- Testing the rendering of issues and pagination buttons
- Verifying the correct display of issue details

## Notes

### Search Params

I utilized `searchParams` to handle URL parameters effectively. I passed the `searchParams` from the homepage to the IssuesList component, where I extracted and used them to modify my GraphQL query based on user interactions with the pagination and filter buttons.

### Cursor-based Pagination

The GitHub GraphQL API provides cursor-based pagination. However, I wanted to implement bidirectional navigation (previous and next page) rather than just a "Load more" functionality. To achieve this, I utilized the `before` and `last` parameters provided by the API in addition to the standard `after` and `first` parameters.

## Setup

This application requires a GitHub Personal Access Token to function. Follow these steps to set it up:

1. Create a GitHub Personal Access Token:

   - Go to GitHub Settings -> Developer Settings -> Personal Access Tokens
   - Generate a new token with 'repo' scope

2. In the root of the project, create a file named `.env.local`

3. Add the following line to `.env.local`:GITHUB_ACCESS_TOKEN=your_token_here

Replace `your_token_here` with the token you generated.

4. Run `npm install` to install dependencies

5. Run `npm run dev` to start the development server

6. run `npm run test` to run the Unit tests

## Conclusion

The project was super fun. Thank you for your consideration, and I look forward to any feedback you might have.
