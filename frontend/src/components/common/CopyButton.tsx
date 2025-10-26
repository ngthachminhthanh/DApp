import { useState } from "react"
import { toast } from "sonner"
import { Check } from "lucide-react"
import CopyIcon from "@/assets/icons/profile-copy-icon.svg?react"

interface CopyButtonProps {
  text: string
};

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return copied ? (
    <Check className="w-4 h-4 text-green-500" />
  ) : (
    <CopyIcon
      onClick={handleCopy}
      className="w-4 h-4 cursor-pointer hover:opacity-80"
    />
  )
}
