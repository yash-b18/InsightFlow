import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("Landing page", () => {
  it("renders the hero headline and a primary CTA", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /get answers, not dashboards/i,
    );
    expect(
      screen.getAllByRole("link", { name: /start for free/i }).length,
    ).toBeGreaterThan(0);
  });

  it("renders the key marketing sections", () => {
    render(<Home />);
    expect(screen.getByText(/from raw file to real answer/i)).toBeInTheDocument();
    expect(
      screen.getByText(/everything you need to interrogate a dataset/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/your data stays yours/i)).toBeInTheDocument();
  });
});
