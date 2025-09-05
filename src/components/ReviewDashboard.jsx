import React from 'react';
import ScoreCard from './ScoreCard';

export default function ReviewDashboard({ analysis, loading, message, onCopy, onDownload }) {
  return (
    <section className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-soft p-6 min-h-[32rem] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white">Review Analysis</h2>
        <div className="flex gap-3">
          <button
            onClick={onDownload}
            disabled={!analysis || loading}
            className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm hover:bg-neutral-700 disabled:opacity-50"
            title="Download JSON"
          >
            Download
          </button>
          <button
            onClick={onCopy}
            disabled={!analysis || loading}
            className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm hover:bg-neutral-700 disabled:opacity-50"
            title="Copy JSON"
          >
            Copy
          </button>
        </div>
      </div>

      <div className="relative flex-1">
        {loading && (
          <div className="absolute inset-0 grid place-items-center bg-black/50 rounded-xl">
            <div className="animate-spin h-10 w-10 border-4 border-stone-500 border-t-transparent rounded-full" />
          </div>
        )}

        {!analysis && !loading && (
          <div className="h-full grid place-items-center text-neutral-500 border-2 border-dashed border-neutral-800 rounded-xl">
            Your analysis dashboard will appear here.
          </div>
        )}

        {analysis && !loading && (
          <div className="space-y-6 pr-2">
            {/* Code Quality Scores */}
            <div>
              <h3 className="text-lg font-semibold text-stone-200 mb-3">Code Quality Scores</h3>
              <div className="space-y-4">
                <ScoreCard label="Security" score={analysis?.scores?.security} />
                <ScoreCard label="Readability" score={analysis?.scores?.structure_readability} />
                <ScoreCard label="Performance" score={analysis?.scores?.space_performance_optimization} />
              </div>
            </div>

            {/* Summary */}
            <div>
              <h3 className="text-lg font-semibold text-stone-200 mb-2">Summary</h3>
              <p className="text-stone-300 bg-neutral-800 p-4 rounded-lg text-sm border border-neutral-700">
                {analysis.summary}
              </p>
            </div>

            {/* Strengths, Issues, Suggestions */}
            {['strengths', 'issues', 'suggestions'].map((key) => (
              <div key={key}>
                <h3
                  className={
                    'text-lg font-semibold mb-2 ' +
                    (key === 'strengths' ? 'text-green-400' : key === 'issues' ? 'text-red-400' : 'text-sky-400')
                  }
                >
                  {key[0].toUpperCase() + key.slice(1)}
                </h3>
                <ul className="space-y-2 text-stone-300">
                  {Array.isArray(analysis[key]) && analysis[key].length > 0 ? (
                    analysis[key].map((item, i) => (
                      <li key={i} className="p-3 bg-neutral-800 rounded-lg text-sm border border-neutral-700">
                        {item}
                      </li>
                    ))
                  ) : (
                    <li className="text-neutral-500 p-3 italic text-sm">None found.</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="h-5 mt-4 text-sm">
        {message && <div className="text-red-400">{message}</div>}
      </div>
    </section>
  );
}
