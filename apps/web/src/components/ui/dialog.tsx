"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-(--overlay) data-[state=open]:animate-[fade-in_160ms_ease-out]" />
      <DialogPrimitive.Content
        className={cn(
          "fixed top-1/2 left-1/2 z-60 w-[min(480px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2",
          "max-h-[calc(100dvh-24px)] overflow-y-auto rounded-float border border-stroke bg-surface-raised p-5 sm:p-6",
          "shadow-(--shadow-pop) data-[state=open]:animate-[fade-in_180ms_ease-out]",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <DialogPrimitive.Title className="text-[17px] font-semibold text-ink">{title}</DialogPrimitive.Title>
          <DialogPrimitive.Close
            aria-label="Close"
            className="-mt-1 -mr-1 inline-flex size-8 shrink-0 items-center justify-center rounded-control text-ink-2 hover:bg-sunken hover:text-ink pointer-coarse:size-11"
          >
            <X aria-hidden className="size-4" />
          </DialogPrimitive.Close>
        </div>
        {description ? (
          <DialogPrimitive.Description className="mt-1.5 text-ink-2">{description}</DialogPrimitive.Description>
        ) : null}
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
