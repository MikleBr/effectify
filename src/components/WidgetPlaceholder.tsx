import { cn } from "@/lib/utils";

type WidgetPlaceholderProps = {
  Icon?: React.ElementType;
  className?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
};

export function WidgetPlaceholder({ className, Icon, children, action }: WidgetPlaceholderProps) {
  return (
    <div className={cn('text-center space-y-2', className)}>
      {Icon && <div className="mx-auto size-14 rounded-lg flex items-center justify-center bg-muted">
            <Icon className="mx-auto size-10 text-muted-foreground" />
      </div>}
      <p className="text-sm text-muted-foreground">
        {children}
      </p>
      {action}
    </div>
  );
}
