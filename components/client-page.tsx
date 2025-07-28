"use client" // This component needs to be a client component for scroll effects

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FlaskConical, Lightbulb, Rocket, Sparkles, MenuIcon, XIcon, Sun, Moon } from "lucide-react" // Import XIcon for close button
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet" // Ensure Sheet components are imported
import { useTheme } from "next-themes"

export function ClientPage() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false) // State for mobile nav expansion
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        // Adjust this value to control when the desktop navbar minimizes
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile nav if screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint
        setIsMobileNavOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="relative min-h-[100dvh] bg-background text-foreground">
      {/* grainy overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.4] mix-blend-overlay"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.6) 0%, transparent 90%),
            radial-gradient(circle at 75% 75%, rgba(0,0,0,0.5) 0%, transparent 90%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.55) 0%, transparent 90%),
            radial-gradient(circle at 10% 80%, rgba(0,0,0,0.4) 0%, transparent 90%),
            radial-gradient(circle at 90% 20%, rgba(255,255,255,0.6) 0%, transparent 90%),
            radial-gradient(circle at 40% 60%, rgba(0,0,0,0.35) 0%, transparent 90%),
            radial-gradient(circle at 60% 40%, rgba(255,255,255,0.5) 0%, transparent 90%)
          `,
          backgroundSize: '400px 400px, 500px 500px, 350px 350px, 450px 450px, 300px 300px, 280px 280px, 380px 380px',
          backgroundPosition: '0 0, 200px 200px, 100px 100px, 300px 300px, 150px 150px, 50px 50px, 250px 250px',
        }}
      />

      <header
        className={`
          fixed left-1/2 -translate-x-1/2 z-50
          bg-background/30 backdrop-blur-lg border border-border/50
          transition-all  // Slower transition for header size/position

          // Base width for both mobile and desktop
          w-[calc(100%-2rem)] max-w-screen-xl

          // Desktop specific styles (md and up)
          md:top-4 md:px-6 md:py-3 md:rounded-full
          md:${scrolled ? "md:top-2 md:w-[calc(50%-2rem)] md:px-4 md:py-2" : ""}

          // Mobile specific styles (below md)
          ${isMobileNavOpen ? "top-4 px-6 py-10 rounded-2xl" : "top-4 px-6 py-2 rounded-full"} // Increased py-difference for smoother height transition
        `}
      >
        {/* Desktop Header Content (visible on md and up) */}
        <div
          className={`
            hidden md:flex items-center justify-between h-full
          `}
        >
          <Link href="#" className="flex items-center justify-center flex-shrink-0 overflow-hidden">
            <FlaskConical
              className={`transition-all duration-700 ${scrolled ? "h-5 w-5" : "h-6 w-6"}`} // Icon size transition
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className={`
              ml-auto flex gap-5 items-center
              transition-all duration-700 ease-in-out // Slower transition for nav links
              ${scrolled ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-100 translate-x-0 pointer-events-auto"}
            `}
            style={{ marginLeft: 'auto', marginRight: '1rem' }}
          >
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              features
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              solutions
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              about
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              contact
            </Link>
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
          </nav>
        </div>

        {/* Mobile Header Content (visible below md) */}
        <div
          className={`
            md:hidden flex flex-col h-full
          `}
        >
          {/* Top row for icon and toggle button - always flex-row justify-between */}
          <div className="flex items-center justify-between w-full">
            <Link href="#" className="flex items-center justify-center flex-shrink-0">
              <FlaskConical className="h-6 w-6" /> {/* Always h-6 w-6 on mobile */}
            </Link>
            <div className="flex items-center gap-2">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              >
                {isMobileNavOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                <span className="sr-only">{isMobileNavOpen ? "close navigation menu" : "open navigation menu"}</span>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Links (conditionally rendered for smooth height transition) */}
          {isMobileNavOpen && (
            <nav className="flex flex-col gap-4 w-full pt-4 pb-2">
              <Link
                href="#"
                className="text-lg font-medium hover:underline underline-offset-4"
                onClick={() => setIsMobileNavOpen(false)}
              >
                features
              </Link>
              <Link
                href="#"
                className="text-lg font-medium hover:underline underline-offset-4"
                onClick={() => setIsMobileNavOpen(false)}
              >
                solutions
              </Link>
              <Link
                href="#"
                className="text-lg font-medium hover:underline underline-offset-4"
                onClick={() => setIsMobileNavOpen(false)}
              >
                about
              </Link>
              <Link
                href="#"
                className="text-lg font-medium hover:underline underline-offset-4"
                onClick={() => setIsMobileNavOpen(false)}
              >
                contact
              </Link>
            </nav>
          )}
        </div>
      </header>

      <main className="relative z-10 flex-1 pt-24 md:pt-24 lg:pt-24">
        {" "}
        {/* Add padding to main content to prevent it from being hidden by fixed header */}
        

        
        <section className="w-full pt-16 pb-24 md:pt-20 md:pb-32 lg:pt-24 lg:pb-40 xl:pt-28 xl:pb-48">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                <FlaskConical className="w-3 h-3" />
                lessboringlabs
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                transforming the mundane<br />
                into the magnificent.
              </h1>
              <p className="mx-auto max-w-[800px] text-muted-foreground text-base md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed leading-relaxed">
                lessboringlabs specializes in innovative solutions that bring excitement and efficiency to everyday
                challenges, making life and work truly less boring.
              </p>
              <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center pt-4">
                <Button asChild className="px-6 py-3 text-base">
                  <Link href="#">explore solutions</Link>
                </Button>
                <Button asChild variant="outline" className="px-6 py-3 text-base bg-transparent">
                  <Link href="#">get started</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-16 md:py-28 lg:py-36 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div className="flex flex-col items-center text-center space-y-3 p-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold">innovative design</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  crafting solutions with creativity and a fresh perspective to stand out.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold">seamless integration</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  ensuring our solutions fit perfectly into your existing workflows.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                  <Rocket className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold">performance driven</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  optimizing for speed and efficiency to deliver exceptional results.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold">future-proof technology</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  building with scalable and modern technologies for long-term success.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-16 md:py-28 lg:py-36 border-t">
          <div className="container grid items-center justify-center gap-6 px-4 text-center md:px-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl/tight">
                ready to make things less boring?
              </h2>
              <p className="mx-auto max-w-[500px] text-muted-foreground text-base md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed leading-relaxed">
                join our newsletter to get updates on our latest innovations and insights.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-3">
              <form className="flex flex-col sm:flex-row gap-2">
                <Input type="email" placeholder="enter your email" className="max-w-lg flex-1 px-4 py-2 text-base" />
                <Button type="submit" className="px-6 py-3 text-base">
                  subscribe
                </Button>
              </form>
              <p className="text-xs text-muted-foreground">
                by subscribing, you agree to our{" "}
                <Link href="#" className="underline underline-offset-2">
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} lessboringlabs. all rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            terms of service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}