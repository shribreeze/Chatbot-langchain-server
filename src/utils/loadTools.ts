import path from "path";
import fs from "fs";

export const loadTools = async () => {
  const toolsDir = path.resolve(__dirname, "../tools");
  const files = fs.readdirSync(toolsDir);
  const tools = [];

  for (const file of files) {
    if (file.endsWith(".ts") || file.endsWith(".js")) {
      const toolModule = await import(path.join(toolsDir, file));
      tools.push(toolModule.default);
    }
  }
  return tools;
};