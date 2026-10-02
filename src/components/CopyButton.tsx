import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CopyButtonProps {
  text: string;
  label: string;
}

export const CopyButton = ({ text, label }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard is unavailable; the address is still on screen to select
    }
  };

  return (
    <button type="button" onClick={copy} className="text-link text-ink">
      {copied ? (
        <Check className="size-3.5 text-accent" aria-hidden="true" />
      ) : (
        <Copy className="size-3.5" aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? 'Copied' : label}</span>
    </button>
  );
};
