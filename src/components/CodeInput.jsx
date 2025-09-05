import React from 'react';

export default function CodeInput({ code, setCode, onReview, loading }) {
  return (
    <section className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-soft p-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Your Code</h2>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-[28rem] bg-black border border-neutral-700 rounded-xl p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
        placeholder="<PASTE YOUR CODE HERE>"
      />
      <button
        onClick={onReview}
        disabled={loading}
        className="mt-4 w-full py-3 rounded-xl bg-stone-200 text-black font-semibold hover:bg-stone-300 disabled:bg-neutral-600 disabled:text-neutral-300 transition"
      >
        {loading ? 'Analyzing…' : 'Review Code'}
      </button>
      <p className="text-xs text-neutral-500 mt-3">Tip: Works with JavaScript, Python, Java, C/C++, and more.</p>
    </section>
);
}
