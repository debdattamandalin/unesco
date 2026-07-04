"use client";

import { useEffect, useState } from "react";
import { useNotebookStore } from "@/store/useNotebookStore";
import NotebookEntryBlock from "./NotebookEntryBlock";
import { Edit3, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotebookEditorProps {
  caseId: string;
}

export default function NotebookEditor({ caseId }: NotebookEditorProps) {
  const { entries, addEntry } = useNotebookStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const caseEntries = entries.filter(e => e.caseId === caseId);

  if (!mounted) {
    return (
      <div className="w-1/4 h-full bg-[#f4ebd9] flex flex-col shadow-[inset_2px_0_10px_rgba(0,0,0,0.05)] border-l-4 border-[#1a1715]">
        <div className="p-3 border-b-2 border-dashed border-[#a89f91] bg-[#1a1715] text-[#f4ebd9]">
          <h2 className="font-typewriter font-bold text-sm uppercase tracking-widest flex items-center gap-2">
            <Edit3 size={16} /> Journalist's Notebook
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="w-1/4 h-full bg-[#f4ebd9] flex flex-col shadow-[inset_2px_0_10px_rgba(0,0,0,0.05)] border-l-4 border-[#1a1715]">
      {/* Header */}
      <div className="p-3 border-b-2 border-dashed border-[#a89f91] bg-[#1a1715] text-[#f4ebd9] flex justify-between items-center">
        <h2 className="font-typewriter font-bold text-sm uppercase tracking-widest flex items-center gap-2">
          <Edit3 size={16} /> Journalist's Notebook
        </h2>
        <button 
          onClick={() => addEntry(caseId)}
          className="text-[#a89f91] hover:text-[#f4ebd9] transition-colors"
          title="New Entry"
        >
          <Plus size={16} />
        </button>
      </div>
      
      {/* Scrollable Content */}
      <div className="p-4 flex-grow overflow-y-auto bg-[linear-gradient(#d8cbb8_1px,transparent_1px)] [background-size:100%_2rem] mt-1">
        {caseEntries.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-50 text-center">
            <Edit3 size={32} className="mb-2 text-[#a89f91]" />
            <p className="font-typewriter font-bold text-sm uppercase tracking-widest text-[#5c534d]">Empty Notebook</p>
            <p className="font-serif text-xs text-[#5c534d] mt-1">Click the + to draft notes.</p>
            <Button 
              onClick={() => addEntry(caseId)}
              variant="outline" 
              className="mt-4"
            >
              Start Writing
            </Button>
          </div>
        ) : (
          <div className="space-y-1">
            {caseEntries.map((entry) => (
              <NotebookEntryBlock key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
