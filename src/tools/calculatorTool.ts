export default {
    name: "calculator",
    description: "Do complex math",
    async call(input: string) {
      try {
        const result = eval(input); // Note: Use mathjs in production
        return `Result: ${result}`;
      } catch {
        return "Invalid math expression.";
      }
    },
  };