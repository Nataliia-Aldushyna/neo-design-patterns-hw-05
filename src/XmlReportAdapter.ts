import { ReportAdapter } from "./ReportAdapter";
import { DirectoryReport } from "./DirectoryReport";

export class XmlReportAdapter implements ReportAdapter {
  export(report: DirectoryReport): string {
    const extensionsXml = Object.entries(report.extensions)
      .map(([ext, count]) => `    <extension name="${ext}" count="${count}"/>`)
      .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<report>
  <files>${report.files}</files>
  <directories>${report.directories}</directories>
  <totalSize>${report.totalSize}</totalSize>
  <extensions>
${extensionsXml}
  </extensions>
</report>`;
  }
}