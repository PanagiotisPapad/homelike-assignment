import { render, fireEvent, screen } from "@testing-library/react";
import Filter from "../src/app/components/Filter";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe("Filter Component", () => {
  it("renders both filter buttons", () => {
    render(<Filter />);
    expect(screen.getByText("Open")).toBeInTheDocument();
    expect(screen.getByText("Closed")).toBeInTheDocument();
  });

  it("changes active state when clicked", () => {
    render(<Filter />);
    const openButton = screen.getByText("Open");
    const closedButton = screen.getByText("Closed");

    expect(openButton).toHaveClass("bg-green-500");
    expect(closedButton).not.toHaveClass("bg-red-500");

    fireEvent.click(closedButton);

    expect(openButton).not.toHaveClass("bg-green-500");
    expect(closedButton).toHaveClass("bg-red-500");
  });
});
