import React, { useEffect, useRef } from "react";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const PDFViewer = ({ pdfFile }) => {
  const canvasRef = useRef();

  useEffect(() => {
    if (!pdfFile || !canvasRef.current) return;

    const loadPDF = async () => {
      const loadingTask = pdfjs.getDocument(pdfFile);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;
    };

    loadPDF();
  }, [pdfFile]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 z-0" />;
};
