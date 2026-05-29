"use client";

import { useEffect, useMemo, useState } from "react";
import mediaService, { MEDIA_SECTIONS, MediaAsset } from "@/services/mediaService";

export function useMedia() {
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadMedia = async () => {
      const response = await mediaService.getMedia();
      if (cancelled) return;

      if (response.success && response.data) {
        setMedia(response.data);
      }
      setLoading(false);
    };

    loadMedia();

    return () => {
      cancelled = true;
    };
  }, []);

  const bySection = useMemo(() => {
    return MEDIA_SECTIONS.reduce<Record<string, MediaAsset | undefined>>((acc, section) => {
      acc[section.section_key] = media.find((item) => item.section_key === section.section_key);
      return acc;
    }, {});
  }, [media]);

  return { media, bySection, loading };
}
