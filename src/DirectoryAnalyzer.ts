import * as fs from "fs";
import * as path from "path";
import { DirectoryReport } from "./DirectoryReport";

export class DirectoryAnalyzer {
  analyze(dirPath: string): DirectoryReport {
    let files = 0;
    let directories = 0;
    let totalSize = 0;
    const extensions: Record<string, number> = {};

    const walk = (dir: string) => {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
          directories++;
          walk(fullPath);
        } else if (item.isFile()) {
          files++;
          const stat = fs.statSync(fullPath);
          totalSize += stat.size;
          const ext = path.extname(item.name) || "no-extension";
          extensions[ext] = (extensions[ext] || 0) + 1;
        }
      }
    };

    walk(dirPath);
    return { files, directories, totalSize, extensions };
  }
}
