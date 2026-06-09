import { describe, expect, it } from "vitest";
import {
  filterSafetyDocuments,
  groupAvailableSafetyDocuments,
  type SafetyLibraryDocument,
} from "./safetyLibrary";

const documents: SafetyLibraryDocument[] = [
  {
    title: "Archibald's - CA Workplace Violence Plan",
    company: "Archibald's",
    status: "Available",
    category: "Workplace Violence",
  },
  {
    title: "Safety and Health Protection On the Job - Spanish",
    status: "Available",
    category: "Policies",
    language: "Spanish",
  },
  {
    title: "Heat Illness",
    status: "Pending",
    category: "Pending",
  },
];

describe("safety document library", () => {
  it("filters documents by query and chip filter", () => {
    expect(filterSafetyDocuments(documents, "spanish", "All")).toEqual([documents[1]]);
    expect(filterSafetyDocuments(documents, "", "Workplace Violence")).toEqual([documents[0]]);
    expect(filterSafetyDocuments(documents, "", "Pending")).toEqual([documents[2]]);
  });

  it("groups only available documents by category", () => {
    expect(groupAvailableSafetyDocuments(documents)).toEqual({
      "Workplace Violence": [documents[0]],
      Policies: [documents[1]],
    });
  });
});
