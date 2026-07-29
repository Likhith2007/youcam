import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportReportToPDF(elementId = 'skin-pulse-report', filename = 'SkinPulse_Clinical_Report.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element #${elementId} not found for PDF export`);
    return false;
  }

  try {
    // Show temporary print optimizations if needed
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#090d16',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const canvasWidthMM = imgWidth * ratio;
    const canvasHeightMM = imgHeight * ratio;

    const xOffset = (pdfWidth - canvasWidthMM) / 2;
    const yOffset = 10;

    pdf.addImage(imgData, 'JPEG', xOffset, yOffset, canvasWidthMM, canvasHeightMM);
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Failed to export PDF via html2canvas/jsPDF, falling back to window.print():', error);
    window.print();
    return false;
  }
}
