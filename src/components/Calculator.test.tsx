import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Calculator } from "./Calculator";

describe("Making sure calculator behaves as we expect it", () => {
  it("Should sum up three values", () => {
    render(<Calculator />);

    expect(fireEvent.click(screen.getByTestId("2"))).toBeTruthy();

    expect(screen.getByTestId("input-display").textContent).toBe("2");

    expect(fireEvent.click(screen.getByTestId("2"))).toBeTruthy();

    expect(screen.getByTestId("input-display").textContent).toBe("22");

    expect(fireEvent.click(screen.getByTestId("+"))).toBeTruthy();
    expect(fireEvent.click(screen.getByTestId("2"))).toBeTruthy();

    expect(screen.getByTestId("input-display").textContent).toBe("22+2");

    expect(fireEvent.click(screen.getByTestId("="))).toBeTruthy();

    expect(screen.getByTestId("input-display").textContent).toBe("24");
  });

  it("If user attempts to add a decimal when one already exists the action should be ignored", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByTestId("2"));
    fireEvent.click(screen.getByTestId("."));
    fireEvent.click(screen.getByTestId("."));
    fireEvent.click(screen.getByTestId("."));

    expect(screen.getByTestId("input-display").textContent).toBe("2.");

    // clear input display
    fireEvent.click(screen.getByTestId("AC"));

    expect(screen.getByTestId("input-display").textContent).toBe("");

    fireEvent.click(screen.getByTestId("."));
    fireEvent.click(screen.getByTestId("."));
    fireEvent.click(screen.getByTestId("."));

    expect(screen.getByTestId("input-display").textContent).toBe(".");
  });

  it("If user attempts to add % when one already exists it should be ignored", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByTestId("2"));
    fireEvent.click(screen.getByTestId("%"));
    fireEvent.click(screen.getByTestId("%"));

    expect(screen.getByTestId("input-display").textContent).toBe("2%");
  });

  it("If inputs is empty and user enters % it should be ignored", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByTestId("%"));
    expect(screen.getByTestId("input-display").textContent).toBe("");
  });
});
