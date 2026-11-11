"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type CopyButtonProps = Omit<React.ComponentProps<typeof Button>, "value"> & {
  value: string | (() => string);
  label: string;
  copiedLabel: string;
  iconOnly?: boolean;
};

export function CopyButton({
  value,
  label,
  copiedLabel,
  iconOnly = false,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  async function copy() {
    await navigator.clipboard.writeText(
      typeof value === "function" ? value() : value,
    );
    setCopied(true);
  }

  const text = copied ? copiedLabel : label;

  return (
    <Button
      type="button"
      variant="outline"
      size={iconOnly ? "icon" : "default"}
      aria-label={iconOnly ? text : undefined}
      onClick={copy}
      {...props}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {!iconOnly && text}
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </Button>
  );
}
