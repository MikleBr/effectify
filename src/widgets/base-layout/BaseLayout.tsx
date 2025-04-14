import { Button } from "@/components/ui/button"
import { HomeIcon, SettingsIcon, UserIcon } from "lucide-react"

type BaseLayoutProps = {
  children: React.ReactNode
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed left-4 gap-2 top-1/2 -transition-y-1/2 rounded-full p-1 bg-card text-card-foreground flex flex-col border">
        <Button size="icon" className="rounded-full" variant="secondary">
          <HomeIcon />
        </Button>
        <Button size="icon" className="rounded-full" variant="ghost">
          <UserIcon />
        </Button>
        <Button size="icon" className="rounded-full" variant="ghost">
          <SettingsIcon />
        </Button>
      </div>
      <main className="flex-1 container mx-auto p-4">{children}</main>
    </div>
  )
}
