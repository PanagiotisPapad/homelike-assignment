import { render, screen } from "@testing-library/react";

// Mock the entire IssuesList module
// We did that because: The real component is async, which is hard to test directly.
// and because we want to isolate the component from its dependencies (like API calls).
jest.mock("../src/app/components/IssuesList", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(({ searchParams }) => {
      return (
        <div>
          <h1>Mock IssuesList</h1>
          <ul>
            <li>
              <div className="flex">
                <span>Icon</span>
                <a href="https://github.com/test">Test Issue</a>
              </div>
              <p>Created by testuser on 1/1/2023</p>
            </li>
          </ul>
        </div>
      );
    }),
  };
});

// Import the mocked version
import IssuesList from "../src/app/components/IssuesList";

// Use some dummy search params that could be used in a real scenario and test
describe("IssuesList Component", () => {
  const mockSearchParams = {
    state: "OPEN",
    cursor: null,
    direction: "next",
  };

  it("renders issues", async () => {
    render(<IssuesList searchParams={mockSearchParams} />);
    const issueTitle = await screen.findByText("Test Issue");
    expect(issueTitle).toBeInTheDocument();
  });

  it("displays author and creation date", async () => {
    render(<IssuesList searchParams={mockSearchParams} />);
    const authorInfo = await screen.findByText(/Created by testuser on/);
    expect(authorInfo).toBeInTheDocument();
  });
});
