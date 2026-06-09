export type ResourceSearchItem = {
  title: string;
  type: string;
  href: string;
  keywords?: string[];
};

export function filterResourceItems(items: ResourceSearchItem[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return items;
  }

  return items.filter((item) => {
    const haystack = [item.title, item.type, ...(item.keywords ?? [])].join(" ").toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}
