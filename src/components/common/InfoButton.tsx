import { Button } from "@/components/shadcn/ui/button";

export interface InfoButtonProps {
  details: string;
  active?: boolean;
  onClick?: () => void;
}

const InfoButton = ({ details, active, onClick }: InfoButtonProps) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={`rounded-full px-5 py-1.5 text-xs font-medium uppercase tracking-wider h-auto border-foreground/20 hover:bg-foreground hover:text-white transition-all
      ${active ? "bg-foreground text-white" : "text-foreground"}`}
    >
      {details}
    </Button>
  );
};

export default InfoButton;
