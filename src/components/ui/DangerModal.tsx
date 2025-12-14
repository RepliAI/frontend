"use client";

import { X } from "lucide-react";
import clsx from "clsx";

type DangerModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  loading?: boolean;
  danger?: boolean;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  confirmDisabled?: boolean;
};

export function DangerModal({
  open,
  onClose,
  title,
  description,
  confirmLabel,
  onConfirm,
  loading = false,
  danger = false,
  inputValue,
  onInputChange,
  confirmDisabled = false,
}: DangerModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200 animate-in fade-in zoom-in">
        <div className="flex items-start justify-between p-6 border-b">
          <div>
            <h3
              className={clsx("text-lg font-semibold", danger ? "text-red-700" : "text-gray-900")}>
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>

          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={18} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {onInputChange && (
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Confirmation
              </label>
              <input type="text" value={inputValue} onChange={(e) => onInputChange(e.target.value)} placeholder="SUPPRIMER" className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none"/>
            </div>
          )}
        </div>
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
          <button onClick={onClose} disabled={loading} className="text-sm px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50">
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={loading || confirmDisabled}
            className={clsx(
              "text-sm px-4 py-2 rounded-lg font-medium text-white transition disabled:opacity-50",
              danger
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-900 hover:bg-black"
            )}
          >
            {loading ? "Traitement…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}