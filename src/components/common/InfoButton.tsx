import { Button } from "@/components/shadcn/ui/button";

export interface InfoButtonProps {
  details: string;
  active?: boolean;
}

const InfoButton = ({ details, active }: InfoButtonProps) => {
  return (
    <Button
      variant="outline"
      className={`rounded-full px-5 py-1.5 text-xs font-medium uppercase tracking-wider h-auto border-foreground/20 hover:bg-foreground hover:text-white transition-all
      ${active ? "bg-foreground text-white" : "text-foreground"}`}
    >
      {details}
    </Button>
  );
};

export default InfoButton;
