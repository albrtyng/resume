import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import { Icon } from "@components/Icon/Icon";

const src = new URL("pdfjs-dist/build/pdf.worker.js", import.meta.url);
pdfjs.GlobalWorkerOptions.workerSrc = src.toString();

export const ResumeViewer = () => (
  <div className="flex min-h-screen flex-col items-center py-8">
    <div className="flex w-full justify-center md:max-w-[612px] md:justify-end">
      <a
        className="text-gray-700 hover:cursor-pointer hover:text-gray-400"
        href="/resume.pdf"
        alt-text="Download a copy of Albert's resume (Opens in new tab)"
        target="_blank">
        <Icon name="download" alt-text="" aria-hidden height={24} width={24} />
      </a>
    </div>

    <Document className="overflow-auto p-4" file="/resume.pdf">
      <div className="md:shadow-md">
        <Page pageIndex={0} />
      </div>
    </Document>
  </div>
);
