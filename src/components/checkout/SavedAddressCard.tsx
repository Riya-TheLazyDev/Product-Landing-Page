"use client";

import { motion } from "framer-motion";
import { MapPin, Pencil, Star, Trash2 } from "lucide-react";
import type { SavedAddress } from "@/types/checkout";

type Props = {
  addr: SavedAddress;
  selected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
};

export default function SavedAddressCard({
  addr,
  selected,
  onSelect,
  onEdit,
  onDelete,
  onSetDefault,
}: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl border text-left transition-[border-color,box-shadow,background] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        selected
          ? "border-primary/45 bg-[rgba(8,6,4,0.85)] shadow-[0_0_48px_-20px_rgba(214,195,165,0.22),inset_0_0_0_1px_rgba(214,195,165,0.12)]"
          : "border-white/[0.07] bg-[rgba(4,4,8,0.72)] shadow-[0_24px_60px_-40px_rgba(0,0,0,0.85)] hover:border-primary/20 hover:bg-[rgba(6,6,10,0.82)]"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        className="w-full rounded-2xl px-5 pb-4 pt-5 text-left outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-primary/90">
            <MapPin size={14} strokeWidth={1.25} className="shrink-0" />
            {addr.isDefault && (
              <span className="rounded-full border border-primary/35 bg-primary/10 px-2 py-0.5 text-[7px] font-bold uppercase tracking-[0.28em] text-primary">
                Default
              </span>
            )}
          </div>
          {selected && (
            <span className="text-[7px] font-bold uppercase tracking-[0.35em] text-primary">
              Selected
            </span>
          )}
        </div>
        <p className="font-serif text-lg text-white tracking-wide">{addr.fullName}</p>
        <p className="mt-1 text-[11px] text-white/55">{addr.phone}</p>
        <p className="mt-4 text-[12px] leading-relaxed text-white/70">
          {addr.address}
        </p>
        <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/45">
          {addr.city}, {addr.state} · {addr.zip}
        </p>
        <p className="mt-1 text-[10px] text-white/35">{addr.country}</p>
      </button>

      <div
        className="flex flex-wrap items-center justify-end gap-1 border-t border-white/[0.05] px-3 py-2"
        onClick={(e) => e.stopPropagation()}
      >
        {!addr.isDefault && (
          <button
            type="button"
            onClick={onSetDefault}
            className="rounded-full p-2 text-white/30 transition-colors hover:bg-white/[0.05] hover:text-primary"
            aria-label="Set as default"
          >
            <Star size={15} strokeWidth={1.25} />
          </button>
        )}
        <button
          type="button"
          onClick={onEdit}
          className="rounded-full p-2 text-white/30 transition-colors hover:bg-white/[0.05] hover:text-primary"
          aria-label="Edit address"
        >
          <Pencil size={15} strokeWidth={1.25} />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-full p-2 text-white/30 transition-colors hover:bg-red-500/10 hover:text-red-300/90"
          aria-label="Delete address"
        >
          <Trash2 size={15} strokeWidth={1.25} />
        </button>
      </div>
    </motion.div>
  );
}
