export default {
    name: "web-search",
    description: "Search Google or Bing for live info",
    async call(input: string) {
      return `Simulated web search result for: "${input}"`;
    },
  };