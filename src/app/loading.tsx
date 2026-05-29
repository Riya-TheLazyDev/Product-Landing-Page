"use client";

import { useMedia } from "@/hooks/useMedia";
import { resolveMediaUrl } from "@/services/mediaService";

export default function Loading() {
  const { bySection } = useMedia();
  const loadingLogo = resolveMediaUrl(bySection.loading_screen_logo?.media_url);

  return (
    <div className="luxury-loader-wrapper">
      {loadingLogo ? (
        <img src={loadingLogo} alt="" className="mb-5 max-h-16 max-w-[180px] object-contain" />
      ) : null}
      <div className="luxury-loader-bubble"></div>
    </div>
  );
}
