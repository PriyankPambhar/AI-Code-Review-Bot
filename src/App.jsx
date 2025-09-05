import React, { useState } from 'react';
import CodeInput from './components/CodeInput';
import ReviewDashboard from './components/ReviewDashboard';
import { fetchAnalysis } from './api';

export default function App() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [message, setMessage] = useState('');

  const handleReview = async () => {
    if (!code.trim()) {
      setMessage('Please paste some code to review.');
      return;
    }
    setLoading(true);
    setMessage('');
    setAnalysis(null);
    try {
      const result = await fetchAnalysis(code);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setMessage(err.message || 'Failed to fetch analysis.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!analysis) return;
    navigator.clipboard.writeText(JSON.stringify(analysis, null, 2))
      .then(() => setMessage('Copied to clipboard!'))
      .catch(() => setMessage('Copy failed.'));
  };

  const handleDownloadJSON = () => {
    if (!analysis) return;
    const blob = new Blob([JSON.stringify(analysis, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code-review.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    if (!analysis) return;
    import('jspdf').then(({ jsPDF }) => {
      const doc = new jsPDF();
      const left = 15;
      let y = 20;
      try {
        const img = document.getElementById('pd-logo');
        if (img) {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const imgData = canvas.toDataURL('image/jpeg');
          doc.addImage(imgData, 'JPEG', left, 8, 30, 15);
        }
      } catch (e) {}
      doc.setFontSize(18);
      doc.text('AI Code Review Report', left + 40, y);
      y += 10;
      doc.setFontSize(10);
      doc.text(`Date: ${new Date().toLocaleString()}`, left + 40, y);
      y += 12;
      const addSection = (title, body) => {
        doc.setFontSize(12);
        doc.setTextColor(34,34,34);
        doc.setFillColor(240,240,240);
        doc.rect(left, y, 180, 8, 'F');
        doc.setTextColor(0,0,0);
        doc.text(title, left + 2, y + 6);
        y += 12;
        doc.setFontSize(10);
        const lines = doc.splitTextToSize(body, 180);
        doc.text(lines, left, y);
        y += lines.length * 6 + 6;
        if (y > 260) { doc.addPage(); y = 20; }
      };
      addSection('Summary', analysis.summary || '—');
      addSection('Security Score', `${analysis.scores.security}/100`);
      addSection('Structure & Readability Score', `${analysis.scores.structure_readability}/100`);
      addSection('Space/Performance Optimization Score', `${analysis.scores.space_performance_optimization}/100`);
      addSection('Strengths', (analysis.strengths && analysis.strengths.join('\n')) || '—');
      addSection('Issues', (analysis.issues && analysis.issues.join('\n')) || '—');
      addSection('Suggestions', (analysis.suggestions && analysis.suggestions.join('\n')) || '—');
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.text('Developed by pd', left, 290);
      }
      doc.save('code-review-report.pdf');
    }).catch(err => {
      console.error('Failed to generate PDF', err);
      setMessage('Failed to generate PDF (jspdf error).');
    });
  };

  return (
    <main className="min-h-screen p-6 md:p-10 max-w-5xl mx-auto">
      <header className="text-center mb-8">
        <img id="pd-logo" src={process.env.PUBLIC_URL + '/assets/logo.jpg'} alt="logo" className="mx-auto h-16 mb-3" />
        <h1 className="text-3xl font-bold">AI Code Review Bot</h1>
        <p className="text-stone-400 mt-2">Paste your code and get instant, structured feedback.</p>
      </header>

      <div className="space-y-6">
        <section>
          <CodeInput code={code} setCode={setCode} onReview={handleReview} loading={loading} />
        </section>

        <section>
          <ReviewDashboard
            analysis={analysis}
            loading={loading}
            message={message}
            onCopy={handleCopy}
            onDownload={handleDownloadJSON}
          />
          <div className="mt-4 flex gap-3">
            <button onClick={handleDownloadPDF} disabled={!analysis} className="px-4 py-2 bg-stone-200 text-black rounded">Download PDF</button>
            <button onClick={handleDownloadJSON} disabled={!analysis} className="px-4 py-2 border border-neutral-700 rounded">Download JSON</button>
          </div>
        </section>

        <footer className="mt-8 text-center text-neutral-500">
          <div className="inline-flex items-center gap-2">
            <img src={process.env.PUBLIC_URL + '/assets/logo.jpg'} alt="logo" className="h-6"/>
            <span>Developed by pd</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
