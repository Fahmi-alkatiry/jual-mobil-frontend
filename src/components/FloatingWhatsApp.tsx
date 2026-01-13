import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingWhatsApp() {
  return (
    <a 
      href="https://wa.me/6281234567890" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 animate-bounce hover:animate-none"
    >
      <Button 
        size="lg" 
        className="rounded-full h-14 w-14 p-0 bg-[#25D366] hover:bg-[#128C7E] shadow-lg"
      >
        <MessageCircle className="w-8 h-8 text-white" />
        <span className="sr-only">Chat WhatsApp</span>
      </Button>
    </a>
  )
}
