import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { getHealth, type HealthResponse } from "@/api/health"
import { Loader2Icon, CheckCircle2Icon, XCircleIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-14 items-center px-4">
          <span className="font-semibold text-lg">Template</span>
          <Separator orientation="vertical" className="mx-4 h-6" />
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="http://localhost:8000/docs"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
                >
                  API Docs
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <section className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            React + Vite + FastAPI
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Template Monorepo
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            A production-ready starter with React, TypeScript, shadcn/ui, Tailwind 4,
            and FastAPI. Ready for rapid development.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <a href="http://localhost:8000/docs" target="_blank" rel="noreferrer">
                Open API Docs
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                View on GitHub
              </a>
            </Button>
          </div>
        </section>

        <section className="max-w-xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Backend Status
              </CardTitle>
              <CardDescription>
                Verifies the frontend can reach the FastAPI backend via the health endpoint.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BackendStatusCard />
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        Template Web FastAPI · Built for Cursor
      </footer>
    </div>
  )
}

function BackendStatusCard() {
  const [state, setState] = React.useState<
    { status: "loading" } | { status: "success"; data: HealthResponse } | { status: "error"; error: string }
  >({ status: "loading" })

  React.useEffect(() => {
    getHealth()
      .then((data) => setState({ status: "success", data }))
      .catch((err) => setState({ status: "error", error: String(err) }))
  }, [])

  if (state.status === "loading") {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2Icon className="size-4 animate-spin" />
        <span>Checking backend connection...</span>
      </div>
    )
  }

  if (state.status === "error") {
    return (
      <div className="flex items-center gap-2 text-destructive">
        <XCircleIcon className="size-4 shrink-0" />
        <div>
          <p className="font-medium">Connection failed</p>
          <p className="text-sm text-muted-foreground">{state.error}</p>
          <p className="text-xs mt-2">
            Make sure the backend is running: <code className="bg-muted px-1 rounded">uvicorn backend.main:app --reload --port 8000</code>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
      <CheckCircle2Icon className="size-4 shrink-0" />
      <div>
        <p className="font-medium">Connected</p>
        <p className="text-sm text-muted-foreground">
          {state.data.service}: {state.data.status}
        </p>
      </div>
    </div>
  )
}
