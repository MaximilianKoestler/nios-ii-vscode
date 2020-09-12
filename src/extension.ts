import * as vscode from "vscode";
import { hoverText } from "./hovertext";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  const reference_path = context.asAbsolutePath(
    path.join("resources", "reference.json")
  );
  const reference_data = JSON.parse(fs.readFileSync(reference_path, "utf8"));

  vscode.languages.registerHoverProvider("niosii", {
    provideHover(document, position, token) {
      const line = document.lineAt(position.line);

      const commentStart = line.text.search(/(\/\/)|(\#)/);
      console;
      if (commentStart != -1 && commentStart < position.character) {
        return null;
      }

      const range = document.getWordRangeAtPosition(position);
      const word = document.getText(range);

      const text = hoverText(reference_data, word);
      return text === null
        ? null
        : {
            contents: [text],
          };
    },
  });
}
