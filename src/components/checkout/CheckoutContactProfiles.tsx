"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SavedContactCard from "@/components/checkout/SavedContactCard";
import { validateCheckoutStep, type FieldErrors } from "@/lib/checkout-validation";
import { useCartStore } from "@/stores/cart-store";
import type { ReactNode } from "react";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-[10px] uppercase tracking-[0.35em] text-white/40 font-bold"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-[10px] text-red-400/90 tracking-wide">{error}</p>
      ) : null}
    </div>
  );
}

type Props = {
  fieldErrors: FieldErrors;
  setFieldErrors: (e: FieldErrors) => void;
};

export default function CheckoutContactProfiles({
  fieldErrors,
  setFieldErrors,
}: Props) {
  const draft = useCartStore((s) => s.checkoutDraft);
  const updateCheckoutDraft = useCartStore((s) => s.updateCheckoutDraft);
  const savedContacts = useCartStore((s) => s.savedContacts);
  const selectedContactId = useCartStore((s) => s.selectedContactId);
  const selectCheckoutContact = useCartStore((s) => s.selectCheckoutContact);
  const clearCheckoutContactSelection = useCartStore(
    (s) => s.clearCheckoutContactSelection
  );
  const addSavedContact = useCartStore((s) => s.addSavedContact);
  const updateSavedContact = useCartStore((s) => s.updateSavedContact);
  const deleteSavedContact = useCartStore((s) => s.deleteSavedContact);
  const setDefaultSavedContact = useCartStore((s) => s.setDefaultSavedContact);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [saveAsDefault, setSaveAsDefault] = useState(false);
  const autoSelectDoneRef = useRef(false);

  const touchContact = (patch: Partial<typeof draft>) => {
    clearCheckoutContactSelection();
    updateCheckoutDraft(patch);
  };

  useEffect(() => {
    if (savedContacts.length === 0) {
      autoSelectDoneRef.current = false;
      return;
    }
    if (autoSelectDoneRef.current) return;
    if (selectedContactId) {
      autoSelectDoneRef.current = true;
      return;
    }
    if (draft.email?.trim() || draft.fullName?.trim()) {
      autoSelectDoneRef.current = true;
      return;
    }
    const preferred =
      savedContacts.find((c) => c.isDefault) ?? savedContacts[0];
    if (preferred) {
      selectCheckoutContact(preferred.id);
      autoSelectDoneRef.current = true;
    }
  }, [
    savedContacts,
    selectedContactId,
    draft.email,
    draft.fullName,
    selectCheckoutContact,
  ]);

  const d = draft;

  const handleSaveToBook = () => {
    const errs = validateCheckoutStep(0, d);
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    if (editingId) {
      updateSavedContact(editingId, {
        email: d.email.trim(),
        fullName: d.fullName.trim(),
        phone: d.phone.trim(),
        isDefault: saveAsDefault,
      });
      setEditingId(null);
      selectCheckoutContact(editingId);
    } else {
      const id = addSavedContact({
        email: d.email.trim(),
        fullName: d.fullName.trim(),
        phone: d.phone.trim(),
        isDefault: saveAsDefault,
      });
      selectCheckoutContact(id);
    }
    setSaveAsDefault(false);
  };

  const handleAddNew = () => {
    autoSelectDoneRef.current = true;
    setEditingId(null);
    setSaveAsDefault(false);
    clearCheckoutContactSelection();
    updateCheckoutDraft({
      email: "",
      fullName: "",
      phone: "",
    });
    setFieldErrors({});
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setSaveAsDefault(savedContacts.find((c) => c.id === id)?.isDefault ?? false);
    selectCheckoutContact(id);
    setFieldErrors({});
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Remove this contact from your maison profile?")) return;
    deleteSavedContact(id);
    if (editingId === id) {
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-serif text-2xl text-white tracking-wide">
          Contact information
        </h2>
        <button
          type="button"
          onClick={handleAddNew}
          className="self-start text-[9px] font-bold uppercase tracking-[0.35em] text-primary/90 transition-colors hover:text-primary sm:self-auto"
        >
          + New contact
        </button>
      </div>

      {savedContacts.length > 0 && (
        <div>
          <p className="mb-4 text-[9px] uppercase tracking-[0.4em] text-white/35">
            Saved contacts
          </p>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
            <AnimatePresence mode="popLayout">
              {savedContacts.map((c) => (
                <div
                  key={c.id}
                  className="w-[min(88vw,320px)] shrink-0 snap-center sm:w-auto sm:shrink sm:snap-none"
                >
                  <SavedContactCard
                    contact={c}
                    selected={selectedContactId === c.id}
                    onSelect={() => {
                      setEditingId(null);
                      selectCheckoutContact(c.id);
                      setFieldErrors({});
                    }}
                    onEdit={() => handleEdit(c.id)}
                    onDelete={() => handleDelete(c.id)}
                    onSetDefault={() => setDefaultSavedContact(c.id)}
                  />
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      <motion.div
        layout
        className="rounded-2xl border border-white/[0.06] bg-[rgba(3,3,6,0.55)] p-6 sm:p-8"
      >
        <div className="mb-6 flex flex-col gap-2 border-b border-white/[0.06] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-lg text-white/90">
            {editingId ? "Edit contact" : "Your details"}
          </p>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFieldErrors({});
              }}
              className="text-[9px] uppercase tracking-[0.3em] text-white/35 hover:text-white/70"
            >
              Cancel edit
            </button>
          )}
        </div>

        <div className="space-y-6">
          <Field id="email" label="Email address" error={fieldErrors.email}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={d.email}
              onChange={(e) => touchContact({ email: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
              placeholder="you@example.com"
            />
          </Field>
          <Field id="fullName" label="Full name" error={fieldErrors.fullName}>
            <input
              id="fullName"
              autoComplete="name"
              value={d.fullName}
              onChange={(e) => touchContact({ fullName: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
              placeholder="As shown on your identification"
            />
          </Field>
          <Field id="phone" label="Phone number" error={fieldErrors.phone}>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={d.phone}
              onChange={(e) => touchContact({ phone: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-primary/45 focus:ring-1 focus:ring-primary/25"
              placeholder="+1 (555) 000-0000"
            />
          </Field>

          <label className="flex cursor-pointer items-start gap-3 pt-2">
            <input
              type="checkbox"
              checked={saveAsDefault}
              onChange={(e) => setSaveAsDefault(e.target.checked)}
              className="mt-1 h-3.5 w-3.5 rounded border border-white/20 bg-transparent text-primary focus:ring-primary/40"
            />
            <span className="text-[11px] leading-relaxed text-white/45 tracking-wide">
              Set as default maison contact when saving
            </span>
          </label>

          <motion.button
            type="button"
            layout
            whileTap={{ scale: 0.99 }}
            onClick={handleSaveToBook}
            className="w-full rounded-full border border-primary/35 bg-primary/10 py-3.5 text-[9px] font-bold uppercase tracking-[0.32em] text-primary transition-all duration-700 hover:bg-primary/15 hover:shadow-[0_0_36px_-14px_rgba(214,195,165,0.35)]"
          >
            {editingId ? "Update saved contact" : "Save contact to profile"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
