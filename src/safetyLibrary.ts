export type SafetyLibraryStatus = "Available" | "Pending";

export type SafetyLibraryDocument = {
  title: string;
  href?: string;
  company?: string;
  status: SafetyLibraryStatus;
  category: string;
  language?: "English" | "Spanish";
};

export function filterSafetyDocuments(
  documents: SafetyLibraryDocument[],
  query: string,
  filter: string,
) {
  const normalizedQuery = query.trim().toLowerCase();

  return documents.filter((document) => {
    const searchableText = [
      document.title,
      document.company ?? "",
      document.status,
      document.category,
      document.language ?? "",
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
    const matchesFilter =
      filter === "All" ||
      document.category === filter ||
      document.status === filter ||
      document.language === filter;

    return matchesQuery && matchesFilter;
  });
}

export function groupAvailableSafetyDocuments(documents: SafetyLibraryDocument[]) {
  return documents.reduce<Record<string, SafetyLibraryDocument[]>>((groups, document) => {
    if (document.status === "Pending") {
      return groups;
    }

    groups[document.category] ??= [];
    groups[document.category].push(document);
    return groups;
  }, {});
}
