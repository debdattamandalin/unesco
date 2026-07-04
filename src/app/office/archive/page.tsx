"use client";

import { useGameStore } from "@/store/useGameStore";
import { FolderOpen } from "lucide-react";
import { useState } from "react";

export default function ArchivePage() {
  const { archive } = useGameStore();
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const selectedArticle = archive.find(a => a.id === selectedArticleId);

  return (
    <div className="flex h-full border-4 border-[#1a1715]">
      {/* Left List */}
      <div className="w-1/3 border-r-4 border-[#1a1715] bg-[#e8e1d5] overflow-y-auto">
        <div className="p-4 border-b-2 border-dashed border-[#a89f91] bg-[#d8cbb8]">
          <h2 className="font-heading font-bold text-xl uppercase tracking-widest text-[#1a1715] flex items-center gap-2">
            <FolderOpen size={20} /> Published Archives
          </h2>
        </div>
        
        {(!archive || archive.length === 0) ? (
          <div className="p-8 text-center text-[#5c534d] font-typewriter uppercase text-sm">
            <p>No articles have been published yet.</p>
          </div>
        ) : (
          <div className="divide-y-2 divide-[#a89f91] divide-dashed">
            {archive.map(article => (
              <button 
                key={article.id}
                onClick={() => setSelectedArticleId(article.id)}
                className={`w-full text-left p-4 hover:bg-[#d8cbb8] transition-colors ${selectedArticleId === article.id ? 'bg-[#d8cbb8]' : 'bg-[#f4ebd9]'}`}
              >
                <div className="text-[10px] font-typewriter font-bold uppercase tracking-widest text-[#a89f91] mb-1">
                  Vol {article.gameYear} • Day {article.gameDay}
                </div>
                <h3 className="font-heading text-lg font-bold text-[#1a1715] truncate">{article.headline}</h3>
                <p className="font-serif text-sm text-[#5c534d] truncate mt-1">{article.verdict}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Reading Pane */}
      <div className="w-2/3 bg-[#d8cbb8] flex items-center justify-center p-8 overflow-y-auto shadow-[inset_10px_0_20px_rgba(0,0,0,0.05)]">
        {!selectedArticle ? (
          <div className="text-center opacity-50">
            <FolderOpen size={64} className="mx-auto mb-4 text-[#5c534d]" />
            <h2 className="text-[#5c534d] font-heading text-2xl font-bold uppercase tracking-widest">Select an Article</h2>
            <p className="text-[#5c534d] font-typewriter text-sm mt-2 uppercase tracking-widest">To view from the archives</p>
          </div>
        ) : (
          <div className="w-full max-w-2xl bg-[#e8e1d5] shadow-2xl p-8 border-4 border-double border-[#1a1715] -rotate-1 origin-center min-h-[60vh] flex flex-col">
            <div className="border-b-4 border-double border-[#1a1715] pb-4 mb-6 text-center">
              <h1 className="font-heading text-5xl font-black uppercase tracking-tight text-[#1a1715] mb-2">The Daily Chronicle</h1>
              <div className="flex justify-between items-center border-t-2 border-b-2 border-[#1a1715] py-1 px-2 font-typewriter text-[10px] font-bold uppercase tracking-widest text-[#2d2825]">
                <span>Vol. {selectedArticle.gameYear}, No. {selectedArticle.gameDay}</span>
                <span>City Edition</span>
                <span>Archive Copy</span>
              </div>
            </div>

            <h2 className="font-heading text-4xl font-bold leading-none mb-6 text-center text-[#1a1715] uppercase">
              {selectedArticle.headline}
            </h2>

            <div className="columns-2 gap-8 text-justify font-serif text-[#2d2825] leading-relaxed mb-8">
              <div className="whitespace-pre-wrap">{selectedArticle.articleText}</div>
            </div>

            <div className="mt-auto border-2 border-[#1a1715] p-4 bg-[#f4ebd9] break-inside-avoid shadow-[2px_2px_0_0_#1a1715]">
              <h3 className="font-heading font-bold text-lg mb-2 text-center uppercase border-b border-[#1a1715] pb-2">Investigative Fact Box</h3>
              <div className="space-y-1 font-typewriter text-xs text-[#2d2825]">
                <p><span className="font-bold uppercase tracking-wider text-[#1a1715]">Verdict:</span> {selectedArticle.verdict}</p>
                <p><span className="font-bold uppercase tracking-wider text-[#1a1715]">Confidence:</span> {selectedArticle.confidence}</p>
                <p><span className="font-bold uppercase tracking-wider text-[#1a1715]">Evidence:</span> {selectedArticle.evidenceSummary}</p>
                <p><span className="font-bold uppercase tracking-wider text-[#1a1715]">Sources:</span> {selectedArticle.sources}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
