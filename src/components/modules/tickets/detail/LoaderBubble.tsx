"use client";

export function LoaderBubble() {
  return (
    <div className="flex justify-end mb-4 animate-fadeIn">
      <div className="max-w-[75%] px-4 py-3 rounded-2xl shadow-sm border 
                      bg-blue-100 text-blue-700 border-blue-300 rounded-br-none
                      flex items-center space-x-2">
        <span className="loader-dot animate-bounce delay-0">●</span>
        <span className="loader-dot animate-bounce delay-150">●</span>
        <span className="loader-dot animate-bounce delay-300">●</span>
        <span className="text-sm ml-2 opacity-80">L’IA rédige…</span>
      </div>
    </div>
  );
}