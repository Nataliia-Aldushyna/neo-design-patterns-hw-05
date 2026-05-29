import { DirectoryAnalyzer } from "./DirectoryAnalyzer";
import { ReportAdapter } from "./ReportAdapter";

// Патерн Фасад: спрощує роботу з аналізатором та адаптером
export class AnalyzerFacade {
  private analyzer = new DirectoryAnalyzer();

  constructor(private adapter: ReportAdapter) {}

  generateReport(dirPath: string): string {
    const report = this.analyzer.analyze(dirPath);
    return this.adapter.export(report);
  }
}