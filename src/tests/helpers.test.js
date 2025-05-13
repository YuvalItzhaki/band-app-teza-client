import { describe, it, expect } from "vitest";
import { countCapitalizedWords, isYearEven } from "../utils/helpers";

describe("countCapitalizedWords", () => {
  it("counts words that start with a capital letter", () => {
    const input = "This is a Test With Capital Letters";
    expect(countCapitalizedWords(input)).toBe(5);
  });

  it("returns 0 for empty string", () => {
    expect(countCapitalizedWords("")).toBe(0);
  });
});

describe("isYearEven", () => {
  it("returns true for even year", () => {
    expect(isYearEven(2024)).toBe(true);
  });

  it("returns false for odd year", () => {
    expect(isYearEven(2023)).toBe(false);
  });
});
