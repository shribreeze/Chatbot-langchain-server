export default {
    name: "calculator",
    description: "Do complex math",
    async call(input: string) {
      try {
        const result = eval(input);
        return `Result: ${result}`;
      } catch {
        return "Invalid math expression.";
      }
    },
  };