'use client';

import { pdf } from '@react-pdf/renderer';
import { useState, useEffect } from 'react';

import EICRDocument from '../components/template';
import { DefaultValues } from '../default-values';

export default function PDFPage() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const generatePdf = async () => {
      const blob = await pdf(<EICRDocument data={DefaultValues} />).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    };

    generatePdf();

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {pdfUrl ? (
        <iframe src={pdfUrl} className="w-full h-full border" />
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
}
