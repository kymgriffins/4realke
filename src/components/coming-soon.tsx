import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { ArrowLeft, ArrowRight, Clock, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ComingSoonProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function ComingSoon({
  title,
  description,
  icon: Icon = Clock
}: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200">
        <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 relative rounded-lg overflow-hidden transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/4RealKE.webp"
                alt="4RealKE Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login" className="text-sm hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Get Started</Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Coming Soon Content */}
      <div className="container mx-auto px-4 py-20 max-w-4xl text-center">
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-8">
            <Icon className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
            {description}
          </p>
        </div>

        <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-12 mb-12 border border-border/50">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-primary mr-3" />
            <span className="text-lg font-semibold">Coming Soon</span>
          </div>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            We're working hard to bring you this feature. Stay tuned for updates and be the first to know when it launches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary hover:bg-primary/90">
              <Link href="/auth/signup" className="flex items-center">
                Get Notified When Live
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline">
              <Link href="/" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Want to be notified when this feature launches? <Link href="/contact" className="text-primary hover:underline">Contact us</Link>
        </div>
      </div>
    </div>
  );
}
