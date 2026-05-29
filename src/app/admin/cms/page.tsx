"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Clapperboard,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
  Upload,
  XCircle,
} from "lucide-react";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import mediaService, {
  MEDIA_SECTIONS,
  MediaAsset,
  resolveMediaUrl,
} from "@/services/mediaService";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm", "video/ogg", "video/quicktime", "video/x-matroska", "video/mpeg"];
const MAX_FILE_SIZE = 50 * 1024 * 1024;

type PendingUpload = {
  file: File;
  preview: string;
  mediaType: "image" | "video";
};

export default function CMSPage() {
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [pendingUploads, setPendingUploads] = useState<Record<string, PendingUpload>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [removing, setRemoving] = useState<Record<string, boolean>>({});
  const [quoteDrafts, setQuoteDrafts] = useState<Record<string, string>>({});
  const [authorDrafts, setAuthorDrafts] = useState<Record<string, string>>({});
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});
  const pendingUploadsRef = useRef<Record<string, PendingUpload>>({});

  const loadMedia = async () => {
    setLoading(true);
    const response = await mediaService.getMedia();
    if (response.success && response.data) {
      setMedia(response.data);
      setQuoteDrafts(
        response.data.reduce<Record<string, string>>((acc, item) => {
          acc[item.section_key] = item.quote_text || "";
          return acc;
        }, {})
      );
      setAuthorDrafts(
        response.data.reduce<Record<string, string>>((acc, item) => {
          acc[item.section_key] = item.quote_author || "";
          return acc;
        }, {})
      );
    } else {
      setMessage({ type: "error", text: response.error || "Unable to load media sections." });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMedia();
  }, []);

  useEffect(() => {
    pendingUploadsRef.current = pendingUploads;
  }, [pendingUploads]);

  useEffect(() => {
    return () => {
      Object.values(pendingUploadsRef.current).forEach((item) => URL.revokeObjectURL(item.preview));
    };
  }, []);

  const mediaBySection = useMemo(() => {
    return MEDIA_SECTIONS.reduce<Record<string, MediaAsset | undefined>>((acc, section) => {
      acc[section.section_key] = media.find((item) => item.section_key === section.section_key);
      return acc;
    }, {});
  }, [media]);

  const filteredSections = MEDIA_SECTIONS.filter((section) =>
    section.title.toLowerCase().includes(query.toLowerCase().trim())
  );

  const selectedCount = Object.keys(pendingUploads).length;
  const configuredCount = media.filter((item) => item.media_url).length;
  const videoCount = media.filter((item) => item.media_type === "video").length;
  const imageCount = media.filter((item) => item.media_type === "image").length;

  const validateFile = (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Only JPG, PNG, WEBP, MP4, and WEBM files are supported.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "Media file is too large. Maximum upload size is 50MB.";
    }

    return "";
  };

  const handleFileChange = (sectionKey: string, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    setPendingUploads((current) => {
      const existing = current[sectionKey];
      if (existing) URL.revokeObjectURL(existing.preview);

      return {
        ...current,
        [sectionKey]: {
          file,
          preview: URL.createObjectURL(file),
          mediaType: file.type.startsWith("video/") ? "video" : "image",
        },
      };
    });
    setMessage(null);
  };

  const saveMedia = async (sectionKey: string, current?: MediaAsset) => {
    const pending = pendingUploads[sectionKey];
    if (!pending && !current?.id) return;

    setUploading((current) => ({ ...current, [sectionKey]: true }));
    const quote = {
      quote_text: quoteDrafts[sectionKey] || "",
      quote_author: authorDrafts[sectionKey] || "",
    };
    const response = pending
      ? await mediaService.uploadMedia(sectionKey, pending.file, quote)
      : await mediaService.updateMedia(current!.id, quote);

    if (response.success && response.data) {
      setMedia((current) =>
        current.some((item) => item.section_key === sectionKey)
          ? current.map((item) => (item.section_key === sectionKey ? response.data! : item))
          : [...current, response.data!]
      );
      setPendingUploads((current) => {
        const next = { ...current };
        URL.revokeObjectURL(next[sectionKey].preview);
        delete next[sectionKey];
        return next;
      });
      setQuoteDrafts((items) => ({ ...items, [sectionKey]: response.data!.quote_text || "" }));
      setAuthorDrafts((items) => ({ ...items, [sectionKey]: response.data!.quote_author || "" }));
      setMessage({ type: "success", text: `${response.data.title} saved successfully.` });
    } else {
      setMessage({ type: "error", text: response.error || "Upload failed. Please try again." });
    }

    setUploading((current) => ({ ...current, [sectionKey]: false }));
  };

  const removeMedia = async (sectionKey: string, current?: MediaAsset) => {
    const pending = pendingUploads[sectionKey];

    if (pending) {
      setPendingUploads((items) => {
        const next = { ...items };
        URL.revokeObjectURL(next[sectionKey].preview);
        delete next[sectionKey];
        return next;
      });
      setMessage({ type: "success", text: "Selected media removed before saving." });
      return;
    }

    if (!current?.id || !current.media_url) return;

    setRemoving((items) => ({ ...items, [sectionKey]: true }));
    const response = await mediaService.clearMedia(current.id);

    if (response.success && response.data) {
      setMedia((items) =>
        items.map((item) => (item.id === current.id ? response.data! : item))
      );
      setMessage({ type: "success", text: `${response.data.title} removed successfully.` });
    } else {
      setMessage({ type: "error", text: response.error || "Unable to remove media." });
    }

    setRemoving((items) => ({ ...items, [sectionKey]: false }));
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-primary/70">
            Visual Media Library
          </p>
          <h1 className="mt-3 text-2xl font-serif tracking-tight text-white">
            Admin Media Manager
          </h1>
          <p className="mt-2 max-w-2xl text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">
            Select a section, upload image or video, save, and the storefront updates automatically
          </p>
        </div>

        <button
          type="button"
          onClick={loadMedia}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-white/55 transition hover:border-primary/30 hover:text-primary"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Sections", value: MEDIA_SECTIONS.length, icon: ImageIcon },
          { label: "Configured", value: configuredCount, icon: CheckCircle2 },
          { label: "Images", value: imageCount, icon: ImageIcon },
          { label: "Videos", value: videoCount, icon: Clapperboard },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-white/[0.05] bg-white/[0.01] p-5"
          >
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-primary">
              <card.icon size={16} strokeWidth={1.5} />
            </div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/30">
              {card.label}
            </p>
            <p className="mt-2 text-2xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {message ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`flex items-center gap-3 rounded-2xl border px-5 py-4 text-xs ${
              message.type === "success"
                ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
                : "border-rose-400/20 bg-rose-500/10 text-rose-100"
            }`}
          >
            {message.type === "success" ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
            {message.text}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search media sections..."
            className="w-full rounded-xl border border-white/[0.05] bg-white/[0.02] py-3 pl-11 pr-4 text-[11px] text-white outline-none transition placeholder:text-white/20 focus:border-primary/40"
          />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/35">
          {selectedCount ? `${selectedCount} ready to save` : "No pending uploads"}
        </p>
      </div>

      {loading ? (
        <div className="flex min-h-[360px] items-center justify-center rounded-3xl border border-white/[0.05] bg-white/[0.01]">
          <Loader2 className="animate-spin text-primary" size={28} />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredSections.map((section, index) => {
            const current = mediaBySection[section.section_key];
            const pending = pendingUploads[section.section_key];
            const previewUrl = pending?.preview || resolveMediaUrl(current?.media_url);
            const mediaType = pending?.mediaType || current?.media_type;
            const isBusy = Boolean(uploading[section.section_key]);
            const isRemoving = Boolean(removing[section.section_key]);
            const canRemove = Boolean(pending || current?.media_url);
            const quoteDraft = quoteDrafts[section.section_key] ?? current?.quote_text ?? "";
            const authorDraft = authorDrafts[section.section_key] ?? current?.quote_author ?? "";
            const quoteChanged =
              section.supportsQuote &&
              (quoteDraft !== (current?.quote_text || "") ||
                authorDraft !== (current?.quote_author || ""));
            const canSave = Boolean(pending || quoteChanged);

            return (
              <motion.article
                key={section.section_key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.025 }}
                className="overflow-hidden rounded-3xl border border-white/[0.05] bg-white/[0.01] transition hover:bg-white/[0.02]"
              >
                <div className="relative h-52 border-b border-white/[0.05] bg-black/35">
                  {previewUrl ? (
                    mediaType === "video" ? (
                      <video
                        src={previewUrl}
                        muted
                        loop
                        playsInline
                        controls
                        className="h-full w-full object-cover opacity-80"
                      />
                    ) : (
                      <img
                        src={previewUrl}
                        alt=""
                        className="h-full w-full object-cover opacity-80"
                      />
                    )
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-white/25">
                      <ImageIcon size={30} strokeWidth={1.2} />
                      <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.24em]">
                        Using built-in brand mark
                      </p>
                    </div>
                  )}

                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/55 px-3 py-1 text-[8px] font-bold uppercase tracking-widest text-white/60">
                    {mediaType || "Empty"}
                  </div>
                  {pending ? (
                    <div className="absolute right-14 top-4 rounded-full border border-primary/25 bg-primary/15 px-3 py-1 text-[8px] font-bold uppercase tracking-widest text-primary">
                      Ready
                    </div>
                  ) : null}
                  {canRemove ? (
                    <button
                      type="button"
                      disabled={isBusy || isRemoving}
                      onClick={() => removeMedia(section.section_key, current)}
                      className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-rose-400/20 bg-black/60 text-rose-200 transition hover:border-rose-300/40 hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-45"
                      aria-label={`Remove ${section.title}`}
                    >
                      {isRemoving ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    </button>
                  ) : null}
                </div>

                <div className="space-y-5 p-6">
                  <div>
                    <h2 className="font-serif text-base tracking-wide text-white">{section.title}</h2>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                      Current live website media
                    </p>
                  </div>

                  {section.supportsQuote ? (
                    <div className="space-y-3 rounded-2xl border border-white/[0.05] bg-black/20 p-4">
                      <label className="block">
                        <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.26em] text-white/35">
                          Quote
                        </span>
                        <textarea
                          value={quoteDraft}
                          onChange={(event) =>
                            setQuoteDrafts((items) => ({
                              ...items,
                              [section.section_key]: event.target.value,
                            }))
                          }
                          className="h-24 w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-xs leading-relaxed text-white outline-none transition placeholder:text-white/20 focus:border-primary/35"
                          placeholder="Enter quote text"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.26em] text-white/35">
                          Author
                        </span>
                        <input
                          value={authorDraft}
                          onChange={(event) =>
                            setAuthorDrafts((items) => ({
                              ...items,
                              [section.section_key]: event.target.value,
                            }))
                          }
                          className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-xs text-white outline-none transition placeholder:text-white/20 focus:border-primary/35"
                          placeholder="Optional author"
                        />
                      </label>
                    </div>
                  ) : null}

                  <input
                    ref={(node) => {
                      fileInputs.current[section.section_key] = node;
                    }}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,.mp4,.webm"
                    className="hidden"
                    onChange={(event) => handleFileChange(section.section_key, event)}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputs.current[section.section_key]?.click()}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-white/55 transition hover:border-primary/30 hover:text-primary"
                    >
                      <Upload size={14} />
                      {current?.media_url ? "Replace" : "Upload"}
                    </button>
                    <button
                      type="button"
                      disabled={!canSave || isBusy}
                      onClick={() => saveMedia(section.section_key, current)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[#050308] transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      {isBusy ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                      Save
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </div>
  );
}
