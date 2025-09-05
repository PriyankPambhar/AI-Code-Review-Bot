import React from 'react';

export default function ScoreCard({ label, score }) {
  const clamped = Math.max(0, Math.min(100, Number.isFinite(score) ? score : 0));
  let color = 'bg-red-600';
  if (clamped >= 75) color = 'bg-green-500';
  else if (clamped >= 40) color = 'bg-yellow-500';

  return (
    <div className="bg-neutral-800 p-4 rounded-xl border border-neutral-700">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-stone-400">{label}</span>
        <span className="text-lg font-bold text-white">{clamped}</span>
      </div>
      <div className="w-full bg-neutral-700 rounded-full h-2">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
