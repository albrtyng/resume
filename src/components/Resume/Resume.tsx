import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import { Icon } from "@components/Icon/Icon";
import { useBreakpoint } from "@lib/hooks/useBreakpoint";

const src = new URL("pdfjs-dist/build/pdf.worker.js", import.meta.url);
pdfjs.GlobalWorkerOptions.workerSrc = src.toString();

export const ResumeViewer = () => {
  const { isXs, isMd } = useBreakpoint();

  return (
    <div className="max-w-screen flex min-h-screen flex-col items-center py-8">
      <div className="flex w-full justify-center">
        <a
          className="text-gray-700 hover:cursor-pointer hover:text-gray-400"
          href="/resume.pdf"
          alt-text="Download a copy of Albert's resume (Opens in new tab)"
          target="_blank">
          <Icon name="download" alt-text="" aria-hidden height={24} width={24} />
        </a>
      </div>
      <div className="max-w-screen w-full overflow-auto">
        <Document className="box-border w-full sm:p-4 md:p-0 lg:p-4" file="/resume.pdf">
          <Page className="md:shadow-md" scale={isXs ? 1.25 : isMd ? 1 : 1.75} pageIndex={0} />
        </Document>
      </div>
    </div>
  );
};
