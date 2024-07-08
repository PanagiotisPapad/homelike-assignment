import { render, screen } from "@testing-library/react";
import PaginationButtons from "../src/app/components/PaginationButtons";

describe("PaginationButtons Component", () => {
  it("renders both buttons when hasNextPage and hasPreviousPage are true", () => {
    render(
      <PaginationButtons
        nextCursor="next"
        prevCursor="prev"
        hasNextPage={true}
        hasPreviousPage={true}
        issueState="OPEN"
      />
    );
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("only renders Next button when hasPreviousPage is false", () => {
    render(
      <PaginationButtons
        nextCursor="next"
        prevCursor="prev"
        hasNextPage={true}
        hasPreviousPage={false}
        issueState="OPEN"
      />
    );
    expect(screen.queryByText("Previous")).not.toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("only renders Previous button when hasNextPage is false", () => {
    render(
      <PaginationButtons
        nextCursor="next"
        prevCursor="prev"
        hasNextPage={false}
        hasPreviousPage={true}
        issueState="OPEN"
      />
    );
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.queryByText("Next")).not.toBeInTheDocument();
  });
});
