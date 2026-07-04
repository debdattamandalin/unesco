"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useGameStore } from "@/store/useGameStore";
import { Button } from "@/components/ui/button";
import { Send, FileText } from "lucide-react";

export default function PublishingDeskPage() {
  const router = useRouter();
  const params = useParams();
  const caseId = params.id as string;
  const { publishArticle, activeCases, currentDay, currentYear } = useGameStore();
  
  const currentCase = activeCases.find(c => c.id === caseId);

  const [formData, setFormData] = useState({
    headline: "",
    articleText: "",
    verdict: "",
    evidenceSummary: "",
    sources: "",
    confidence: "",
  });

  if (!currentCase) return null; // handled by layout

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePublish = () => {
    publishArticle({
      caseId,
      headline: formData.headline || "Untitled Case",
      articleText: formData.articleText || "No text provided.",
      verdict: formData.verdict || "Inconclusive",
      evidenceSummary: formData.evidenceSummary || "No evidence summarized.",
      sources: formData.sources || "Anonymous",
      confidence: formData.confidence || "Unknown",
    });
    router.push("/office");
  };

  return (
    <div className="w-full h-full flex overflow-hidden">
      
      {/* Left: Editor Form */}
      <div className="w-1/2 h-full bg-[#d8cbb8] border-r-4 border-[#1a1715] flex flex-col relative overflow-hidden z-10 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.05)]">
        {/* Typewriter texture overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px] pointer-events-none"></div>
        
        <div className="p-6 border-b-4 border-[#1a1715] bg-[#e8e1d5] text-[#1a1715] z-10 shadow-lg">
          <h2 className="font-typewriter font-bold text-xl uppercase tracking-widest flex items-center gap-3">
            <FileText size={24} /> The Typewriter
          </h2>
          <p className="font-serif text-[#5c534d] text-sm mt-1">Draft your final story. What you write will be printed.</p>
        </div>

        <div className="flex-grow overflow-y-auto p-8 z-10">
          <div className="bg-[#f9f4ec] p-8 border-2 border-[#1a1715] shadow-2xl space-y-6">
            
            <div>
              <label className="block font-typewriter font-bold text-sm uppercase tracking-widest text-[#2d2825] mb-2">Headline</label>
              <input 
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="EXTRA! EXTRA! Mayor caught red-handed!"
                className="w-full font-heading text-2xl font-bold bg-transparent border-b-2 border-dashed border-[#a89f91] focus:border-[#1a1715] outline-none py-2 text-[#1a1715] placeholder:text-[#a89f91]/50"
              />
            </div>

            <div>
              <label className="block font-typewriter font-bold text-sm uppercase tracking-widest text-[#2d2825] mb-2">The Story</label>
              <textarea 
                name="articleText"
                value={formData.articleText}
                onChange={handleChange}
                placeholder="Write the full story here..."
                rows={6}
                className="w-full font-serif text-lg leading-relaxed bg-transparent border-2 border-dashed border-[#a89f91] focus:border-[#1a1715] outline-none p-4 text-[#1a1715] resize-y placeholder:text-[#a89f91]/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-typewriter font-bold text-sm uppercase tracking-widest text-[#2d2825] mb-2">Verdict / Conclusion</label>
                <input 
                  name="verdict"
                  value={formData.verdict}
                  onChange={handleChange}
                  placeholder="Guilty as charged."
                  className="w-full font-typewriter bg-transparent border-b-2 border-dashed border-[#a89f91] focus:border-[#1a1715] outline-none py-2 text-[#1a1715] placeholder:text-[#a89f91]/50"
                />
              </div>
              
              <div>
                <label className="block font-typewriter font-bold text-sm uppercase tracking-widest text-[#2d2825] mb-2">Confidence %</label>
                <input 
                  name="confidence"
                  value={formData.confidence}
                  onChange={handleChange}
                  placeholder="e.g. 95%"
                  className="w-full font-mono text-xl bg-transparent border-b-2 border-dashed border-[#a89f91] focus:border-[#1a1715] outline-none py-2 text-[#1a1715] placeholder:text-[#a89f91]/50"
                />
              </div>
            </div>

            <div>
              <label className="block font-typewriter font-bold text-sm uppercase tracking-widest text-[#2d2825] mb-2">Evidence Summary</label>
              <textarea 
                name="evidenceSummary"
                value={formData.evidenceSummary}
                onChange={handleChange}
                placeholder="List key evidence used..."
                rows={3}
                className="w-full font-typewriter text-sm bg-transparent border-2 border-dashed border-[#a89f91] focus:border-[#1a1715] outline-none p-3 text-[#1a1715] resize-y placeholder:text-[#a89f91]/50"
              />
            </div>

            <div>
              <label className="block font-typewriter font-bold text-sm uppercase tracking-widest text-[#2d2825] mb-2">Sources Used</label>
              <input 
                name="sources"
                value={formData.sources}
                onChange={handleChange}
                placeholder="Anonymous informant, Police Report 442"
                className="w-full font-typewriter text-sm bg-transparent border-b-2 border-dashed border-[#a89f91] focus:border-[#1a1715] outline-none py-2 text-[#1a1715] placeholder:text-[#a89f91]/50"
              />
            </div>
            
          </div>
        </div>

        <div className="p-4 bg-[#e8e1d5] flex justify-end z-10 border-t-4 border-[#1a1715]">
          <Button 
            onClick={handlePublish}
            disabled={!formData.headline || !formData.articleText}
            className="h-12 px-8 flex items-center justify-center"
          >
            <Send size={18} className="mr-2" /> Send to Press
          </Button>
        </div>
      </div>

      {/* Right: Live Preview */}
      <div className="w-1/2 h-full bg-[#a89f91] flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-2xl bg-[#e8e1d5] shadow-2xl p-8 border-4 border-double border-[#1a1715] rotate-1 origin-center min-h-[80vh] flex flex-col">
          
          {/* Newspaper Header */}
          <div className="border-b-4 border-double border-[#1a1715] pb-4 mb-6 text-center">
            <h1 className="font-heading text-6xl font-black uppercase tracking-tight text-[#1a1715] mb-2">The Daily Chronicle</h1>
            <div className="flex justify-between items-center border-t-2 border-b-2 border-[#1a1715] py-1 px-2 font-typewriter text-xs font-bold uppercase tracking-widest text-[#2d2825]">
              <span>Vol. 42, No. {currentDay}</span>
              <span>City Edition</span>
              <span>2 Cents</span>
            </div>
          </div>

          {/* Article Body */}
          <div className="flex-grow">
            {formData.headline ? (
              <h2 className="font-heading text-5xl font-bold leading-none mb-6 text-center text-[#1a1715] break-words uppercase">
                {formData.headline}
              </h2>
            ) : (
              <h2 className="font-heading text-4xl font-bold leading-tight mb-6 text-center text-[#a89f91]/50 break-words uppercase">
                HEADLINE PREVIEW
              </h2>
            )}

            <div className="columns-2 gap-8 text-justify font-serif text-[#2d2825] leading-relaxed">
              {formData.articleText ? (
                <div className="whitespace-pre-wrap">{formData.articleText}</div>
              ) : (
                <div className="text-[#a89f91] opacity-50">Article text will appear here in dual columns just like a real 1930s broadsheet...</div>
              )}
            </div>
            
            {/* Fact Box */}
            {(formData.verdict || formData.evidenceSummary || formData.sources || formData.confidence) && (
              <div className="mt-8 border-2 border-[#1a1715] p-4 bg-[#f4ebd9] break-inside-avoid">
                <h3 className="font-heading font-bold text-xl mb-3 text-center uppercase border-b border-[#1a1715] pb-2">Investigative Fact Box</h3>
                <div className="space-y-2 font-typewriter text-sm">
                  {formData.verdict && (
                    <p><span className="font-bold text-[#1a1715] uppercase">Verdict:</span> {formData.verdict}</p>
                  )}
                  {formData.confidence && (
                    <p><span className="font-bold text-[#1a1715] uppercase">Confidence:</span> {formData.confidence}</p>
                  )}
                  {formData.evidenceSummary && (
                    <p><span className="font-bold text-[#1a1715] uppercase">Evidence:</span> {formData.evidenceSummary}</p>
                  )}
                  {formData.sources && (
                    <p><span className="font-bold text-[#1a1715] uppercase">Sources:</span> {formData.sources}</p>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}
