import React, { useState } from 'react';
import { Download, Printer, Share2, FileText, CheckCircle, Sparkles } from 'lucide-react';
import { exportReportToPDF } from '../utils/pdfExporter';

export default function ReportExport({ analysisResult }) {
  const [userName, setUserName] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportedSuccess, setExportedSuccess] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    const success = await exportReportToPDF('skin-pulse-report', `SkinPulse_Report_${userName ? userName.replace(/\s+/g, '_') : 'Patient'}.pdf`);
    setIsExporting(false);
    if (success) {
      setExportedSuccess(true);
      setTimeout(() => setExportedSuccess(false), 3000);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 mb-12 border border-slate-800 no-print">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-teal-400" />
            <h3 className="font-display font-bold text-xl text-white">Export Clinical Diagnostic Report</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">Download your complete YouCam AI skin metrics breakdown as a formatted PDF</p>
        </div>

        {/* Input Name & Export CTA */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            placeholder="Patient / User Name (Optional)"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
          />

          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center space-x-2 transition-all shadow-lg ${
              exportedSuccess
                ? 'bg-emerald-500 text-white'
                : 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-teal-500/20'
            }`}
          >
            {exportedSuccess ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Report Saved!</span>
              </>
            ) : isExporting ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Export PDF Report</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
