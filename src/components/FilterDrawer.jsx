import React from 'react';

export default function FilterDrawer({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <aside className="relative ml-auto w-80 bg-[#0b0b0d] p-4 border-l border-[#2b2226]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button onClick={onClose} className="text-gray-400">Close</button>
        </div>
        <div className="overflow-auto">{children}</div>
      </aside>
    </div>
  );
}
