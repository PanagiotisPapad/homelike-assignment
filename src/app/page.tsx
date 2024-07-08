import IssuesList from "./components/IssuesList";

interface HomeProps {
  searchParams: {
    page: string;
    state?: string;
    cursor?: string;
  };
}

// This is the main page component for our application
// It serves as a container for the IssuesList component

// We're using TypeScript to define the structure of the searchParams
// This ensures type safety when passing these params to child components

// The component uses Tailwind CSS for styling

// The IssuesList component is rendered in the main section
// We pass the searchParams to IssuesList, allowing it to handle pagination and filtering

export default function Home({ searchParams }: HomeProps) {
  return (
    <div className=" bg-gray-100 rounded mt-4">
      <header className="bg-gray-700 text-white p-4 rounded">
        <h1 className="text-2xl font-bold text-center my-4">
          React.js Repository Issues
        </h1>
      </header>
      <main className="p-4">
        <IssuesList searchParams={searchParams} />
      </main>
    </div>
  );
}
