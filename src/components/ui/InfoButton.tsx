"use client";

import { Button } from "@/components/shadcn/ui/button";

export interface InfoButtonProps {
  details: string;
  active?: boolean;
  onClick?: () => void;
}

const InfoButton = ({ details, active, onClick }: InfoButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={`rounded-full px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] h-auto transition-all duration-500 shrink-0 border
      ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-white/5 border-white/10 text-foreground/40 hover:text-foreground hover:border-white/30"
      }`}
    >
      {details}
    </Button>
  );
};

export default InfoButton;
