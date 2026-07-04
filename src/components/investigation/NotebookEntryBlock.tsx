"use client";

import { useEffect, useRef, useState } from "react";
import { NotebookEntry, useNotebookStore } from "@/store/useNotebookStore";
import { useBoardStore } from "@/store/useBoardStore";
import { Trash2, Paperclip, Clock, X } from "lucide-react";

interface NotebookEntryBlockProps {
  entry: NotebookEntry;
}

export default function NotebookEntryBlock({ entry }: NotebookEntryBlockProps) {
  const { updateEntry, deleteEntry, detachFromEntry, attachToEntry } = useNotebookStore();
  const { items } = useBoardStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [entry.content]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateEntry(entry.id, e.target.value);
  };

  const formattedDate = new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const caseItems = items.filter(i => i.caseId === entry.caseId);

  return (
    <div className="group relative bg-[#f9f4ec] border border-[#a89f91] p-4 mb-4 shadow-sm hover:border-[#1a1715] transition-colors">
      {/* Block Header */}
      <div className="flex justify-between items-start mb-2 relative">
        <div className="flex items-center text-[10px] font-bold font-typewriter uppercase tracking-widest text-[#a89f91]">
          <Clock size={12} className="mr-1" />
          {formattedDate}
        </div>
        
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            className="text-[#a89f91] hover:text-[#2d2825] transition-colors"
            title="Attach Evidence"
          >
            <Paperclip size={14} />
          </button>
          <button 
            onClick={() => deleteEntry(entry.id)}
            className="text-[#a89f91] hover:text-red-800 transition-colors"
            title="Delete Note"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Attach Menu Dropdown */}
        {showAttachMenu && (
          <div className="absolute top-6 right-0 w-48 bg-[#f4ebd9] border-2 border-[#1a1715] shadow-[4px_4px_0_0_#1a1715] z-50 p-2">
            <h4 className="text-xs font-bold font-typewriter uppercase border-b-2 border-[#a89f91] mb-2 pb-1 text-[#2d2825]">Attach Item</h4>
            {caseItems.length === 0 ? (
              <p className="text-[10px] font-serif text-[#a89f91]">No evidence on board.</p>
            ) : (
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {caseItems.map(item => (
                  <button 
                    key={item.id}
                    onClick={() => { attachToEntry(entry.id, item.id); setShowAttachMenu(false); }}
                    className="w-full text-left text-xs font-serif truncate p-1 hover:bg-[#e8e1d5] text-[#2d2825]"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Editor Area */}
      <textarea
        ref={textareaRef}
        value={entry.content}
        onChange={handleInput}
        placeholder="Type your deductions..."
        className="w-full bg-transparent border-none resize-none outline-none font-serif text-[#2d2825] text-base leading-relaxed placeholder:text-[#a89f91]/50 overflow-hidden"
        spellCheck={false}
      />

      {/* Attachments Area */}
      {entry.attachments.length > 0 && (
        <div className="mt-3 pt-3 border-t border-dashed border-[#a89f91]/50 flex flex-wrap gap-2">
          {entry.attachments.map((evidenceId) => (
            <div key={evidenceId} className="flex items-center gap-1 bg-[#e8e1d5] border border-[#a89f91] px-2 py-1 text-xs font-bold font-typewriter text-[#5c534d]">
              <Paperclip size={10} />
              <span className="truncate max-w-[120px]">{evidenceId}</span>
              <button 
                onClick={() => detachFromEntry(entry.id, evidenceId)}
                className="ml-1 hover:text-red-800"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Drop Target Hint (Visible only on hover for aesthetics) */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-transparent group-hover:bg-[#a89f91]/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
        <span className="text-[9px] font-typewriter uppercase font-bold text-[#a89f91]">Drop Evidence Here</span>
      </div>
    </div>
  );
}
