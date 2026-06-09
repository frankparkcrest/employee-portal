import { describe, expect, it } from "vitest";
import { filterResourceItems, type ResourceSearchItem } from "./resourceSearch";

const items: ResourceSearchItem[] = [
  {
    title: "AXW - CA Workplace Violence Plan",
    type: "Safety",
    href: "docs/safety/axw-ca-workplace-violence-plan.pdf",
    keywords: ["Andy's Xpress Wash", "WVP"],
  },
  {
    title: "Lakewood",
    type: "Contact",
    href: "#contacts",
    keywords: ["Andy's Express Wash/AMPM", "Premier Ambulance", "Cal/Osha"],
  },
  {
    title: "CHAMP Plan Effective May 1",
    type: "Benefits",
    href: "champ-plan.html",
    keywords: ["Champion Health", "primary care"],
  },
];

describe("filterResourceItems", () => {
  it("returns every resource when the query is blank", () => {
    expect(filterResourceItems(items, "   ")).toEqual(items);
  });

  it("matches title, type, and keyword text without case sensitivity", () => {
    expect(filterResourceItems(items, "lakewood")).toEqual([items[1]]);
    expect(filterResourceItems(items, "champion")).toEqual([items[2]]);
    expect(filterResourceItems(items, "SAFETY")).toEqual([items[0]]);
  });
});
