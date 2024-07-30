import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../../utils";
export const Tooltip = ({
  children,
  content,
  className,
  withArrow,
  arrowClassName,
  side = "bottom",
  align = "center",
  open,
  defaultOpen,
  onOpenChange,
  ...props
}) => {
  return (
    <TooltipPrimitive.Provider delayDuration={300}>
      <TooltipPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side={side}
          align={align}
          {...props}
          className={cn(
            "px-2 flex items-center justify-center border bg-neutral-700/75 border-neutral-700 rounded-sm text-base",
            className
          )}
        >
          {content}
          {withArrow && (
            <TooltipPrimitive.Arrow
              width={10}
              height={5}
              className={cn("fill-neutral-700", arrowClassName)}
            />
          )}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
