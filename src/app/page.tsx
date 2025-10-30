'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Award,
  Battery,
  Brain,
  Camera,
  Car,
  CheckCircle,
  Clock,
  Eye,
  Gauge,
  Mail,
  MapPin,
  Phone,
  Play,
  Settings,
  Shield,
  Star,
  Wrench,
  DollarSign
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [prePurchaseVisible, setPrePurchaseVisible] = useState<number[]>([0, 1, 2]); // Show all steps by default
  const [postPurchaseVisible, setPostPurchaseVisible] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Brand carousel state and refs
  const [currentBrandIndex, setCurrentBrandIndex] = useState(1); // Start at 1 (first real item)
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Trusted brands data - seamless flowing carousel
  const coreBrands = [
    {
      id: 1,
      name: "Toyota",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Toyota.svg/250px-Toyota.svg.png",
      type: "svg"
    },
    {
      id: 2,
      name: "Honda",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Honda_logo.svg/250px-Honda_logo.svg.png",
      type: "svg"
    },
    {
      id: 3,
      name: "Mazda",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Mazda_logo_2024_%28vertical%29.svg/250px-Mazda_logo_2024_%28vertical%29.svg.png",
      type: "svg"
    },
    {
      id: 4,
      name: "Nissan",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Nissan_Motor_Corporation_2020_logo-local_file.svg/250px-Nissan_Motor_Corporation_2020_logo-local_file.svg.png",
      type: "svg"
    },
    {
      id: 5,
      name: "Volkswagen",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/250px-Volkswagen_logo_2019.svg.png",
      type: "svg"
    },
    {
      id: 6,
      name: "BMW",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/250px-BMW_logo_%28gray%29.svg.png",
      type: "svg"
    },
    {
      id: 7,
      name: "Mercedes-Benz",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Mercedes-Benz_Logo_2010.svg/250px-Mercedes-Benz_Logo_2010.svg.png",
      type: "svg"
    },
    {
      id: 8,
      name: "Precision Autocare",
      logo: "/precision-removebg-preview.png",
      type: "png"
    }
  ];

  // Clone items for seamless loop: [lastItem, ...coreBrands, firstItem]
  const prefixClone = coreBrands.slice(-1); // Last item
  const suffixClone = coreBrands.slice(0, 1); // First item
  const carouselBrands = [...prefixClone, ...coreBrands, ...suffixClone];

  // Fixed next handler with proper seamless jump
  const handleNext = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const newIndex = currentBrandIndex + 1;
    setCurrentBrandIndex(newIndex);

    // Check for seamless jump point (at the cloned item at the end)
    if (newIndex === carouselBrands.length - 1) {
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.transition = 'none';
          setCurrentBrandIndex(1); // Jump to first real item
          setTimeout(() => {
            if (carouselRef.current) {
              carouselRef.current.style.transition = 'transform 300ms ease-in-out';
            }
            setIsTransitioning(false);
          }, 10);
        }
      }, 300);
    } else {
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [currentBrandIndex, isTransitioning, carouselBrands.length]);

  // Fixed previous handler with proper seamless jump
  const handlePrev = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const newIndex = currentBrandIndex - 1;
    setCurrentBrandIndex(newIndex);

    // Check for seamless jump point (at the cloned item at the start)
    if (newIndex === 0) {
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.transition = 'none';
          setCurrentBrandIndex(coreBrands.length); // Jump to last real item
          setTimeout(() => {
            if (carouselRef.current) {
              carouselRef.current.style.transition = 'transform 300ms ease-in-out';
            }
            setIsTransitioning(false);
          }, 10);
        }
      }, 300);
    } else {
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [currentBrandIndex, isTransitioning, coreBrands.length]);

  // Handle dot navigation
  const handleDotClick = (index: number) => {
    if (isTransitioning) return;
    setCurrentBrandIndex(index + 1);
  };

  // Auto-play with proper cleanup
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [handleNext]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 3000);
  };


  // Initialize ScrollReveal and set up client-side effects
  useEffect(() => {
    setIsClient(true);
    setMounted(true);

    // Only initialize client-side code after hydration
    if (typeof window !== 'undefined') {
      // Dynamically import ScrollReveal to avoid SSR issues
      import('scrollreveal').then((ScrollRevealModule) => {
        const ScrollReveal = ScrollRevealModule.default;
        // Initialize ScrollReveal
        const sr = ScrollReveal({
          origin: 'bottom',
          distance: '30px',
          duration: 1000,
          delay: 200,
          reset: false,
          easing: 'cubic-bezier(0.5, 0, 0, 1)',
        });

        // Reveal animations for different sections
        sr.reveal('.hero-content', { origin: 'top', distance: '50px', delay: 300 });
        sr.reveal('.hero-buttons', { origin: 'bottom', distance: '40px', delay: 500 });
        sr.reveal('.brand-carousel', { origin: 'left', distance: '80px', delay: 400 });

        // Testimonial cards reveal
        sr.reveal('.testimonial-card:nth-child(1)', { origin: 'left', distance: '60px', delay: 200 });
        sr.reveal('.testimonial-card:nth-child(2)', { origin: 'bottom', distance: '60px', delay: 400 });
        sr.reveal('.testimonial-card:nth-child(3)', { origin: 'right', distance: '60px', delay: 600 });

        // Trust metrics reveal
        sr.reveal('.trust-metric', { interval: 150, distance: '30px' });

        // How it works section
        sr.reveal('.how-it-works-title', { origin: 'top', distance: '40px', delay: 200 });
        sr.reveal('.timeline-step-1', { origin: 'left', distance: '60px', delay: 300 });
        sr.reveal('.timeline-step-2', { origin: 'right', distance: '60px', delay: 500 });
        sr.reveal('.timeline-step-3', { origin: 'left', distance: '60px', delay: 700 });

        // Post-purchase perks
        sr.reveal('.post-step', { interval: 200, distance: '50px' });

        // FAQ section
        sr.reveal('.faq-title', { origin: 'top', distance: '40px' });
        sr.reveal('.faq-item', { interval: 100, distance: '30px' });

        // CTA section
        sr.reveal('.cta-title', { origin: 'top', distance: '40px' });
        sr.reveal('.cta-cards', { origin: 'bottom', distance: '60px', delay: 200 });

        // Set up scroll handlers
        const handleScroll = () => {
          // Pre-Purchase Journey
          const preSection = document.getElementById('pre-purchase');
          if (preSection) {
            const preSteps = preSection.querySelectorAll('.pre-step');
            const newPreVisible: number[] = [];

            preSteps.forEach((step, index) => {
              const rect = step.getBoundingClientRect();
              const isVisible = rect.top <= window.innerHeight * 0.8 && rect.bottom >= 50;
              if (isVisible) {
                newPreVisible.push(index);
              }
            });
            setPrePurchaseVisible(newPreVisible);
          }

          // Post-Purchase Perks
          const postSection = document.getElementById('post-purchase');
          if (postSection) {
            const postSteps = postSection.querySelectorAll('.post-step');
            const newPostVisible: number[] = [];

            postSteps.forEach((step, index) => {
              const rect = step.getBoundingClientRect();
              const isVisible = rect.top <= window.innerHeight * 0.8 && rect.bottom >= 50;
              if (isVisible) {
                newPostVisible.push(index);
              }
            });
            setPostPurchaseVisible(newPostVisible);
          }
        };

        // Initial check and scroll listener
        const timeoutId = setTimeout(() => {
          window.addEventListener('scroll', handleScroll, { passive: true });
          handleScroll();
        }, 100);

        // Cleanup function
        return () => {
          sr.destroy();
          clearTimeout(timeoutId);
          window.removeEventListener('scroll', handleScroll);
        };
      });
    }
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Scroll into view functions
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      {/* Navigation - Minimal for landing page */}
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
            {/* <span className="text-xl font-bold tracking-tight">4RealKE</span> */}
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login" className="text-sm hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Get Started</Button>
            </Link>
            {mounted && <ThemeToggle />}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mx-auto max-w-5xl text-center">
            <div className="hero-content inline-flex items-center rounded-full border border-border bg-muted/50 px-5 py-2 text-sm mb-10">
              <Shield className="w-4 h-4 mr-2 text-primary" />
              Trusted by 1000+ vehicle buyers
            </div>
            <h1 className="hero-content text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-8 leading-tight">
              Know Your Car
              <span className="block text-primary mt-2">Before You Buy</span>
            </h1>
            <p className="hero-content text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Professional pre-purchase vehicle inspections powered by AI technology.
              Get detailed neural network analysis for confident buying decisions.
            </p>
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/auth/signup">
                <Button size="lg" className="h-12 px-8 w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow">
                  Start Your Inspection
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-12 px-8 w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Scroll to sections navigation */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection('pre-purchase')}
                className="text-sm hover:bg-primary/10 border border-border"
              >
                <Settings className="w-4 h-4 mr-2" />
                How It Works
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection('post-purchase')}
                className="text-sm hover:bg-primary/10 border border-border"
              >
                <Award className="w-4 h-4 mr-2" />
                Member Benefits
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection('trust-metrics')}
                className="text-sm hover:bg-primary/10 border border-border"
              >
                <Shield className="w-4 h-4 mr-2" />
                Why Choose Us
              </Button>
            </div>
            {/* Hero Visual */}
            <div className="relative mx-auto max-w-5xl w-full aspect-[21/9] rounded-xl overflow-hidden border border-border shadow-2xl">
              <Image
                src="/4RealKE.webp"
                alt="4RealKE - Professional AI Vehicle Inspection Services"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-black/10" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                {/* <div className="text-center text-white drop-shadow-xl">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                    AI-Powered Vehicle Inspections
                  </h2>
                  <p className="text-lg sm:text-xl lg:text-2xl opacity-95 max-w-3xl mx-auto leading-relaxed font-light">
                    Neural network analysis for confident buying decisions across Kenya
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 lg:py-28 bg-muted/20 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Trusted Brands Carousel */}
          <div className="text-center mb-20">
            <p className="text-muted-foreground text-sm uppercase tracking-wide mb-10">
              Trusted by leading companies
            </p>
            <div
              className="brand-carousel relative w-full max-w-6xl mx-auto overflow-hidden"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 hover:bg-background p-2 rounded-full shadow-lg border border-border transition-all duration-200"
                aria-label="Previous brands"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 hover:bg-background p-2 rounded-full shadow-lg border border-border transition-all duration-200"
                aria-label="Next brands"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Center-Focused Carousel Container */}
              <div className="relative w-full h-32">
                {carouselBrands.map((brand, index) => {
                  // Calculate position relative to center
                  let position = (index - currentBrandIndex + carouselBrands.length) % carouselBrands.length;
                  if (position > carouselBrands.length / 2) position -= carouselBrands.length;

                  const isCenter = position === 0;
                  const isAdjacent = Math.abs(position) === 1;

                  return (
                    <div
                      key={`brand-${brand.id}-${index}`}
                      className={`absolute top-0 transition-all duration-500 ease-out ${
                        isCenter
                          ? 'w-32 h-32 z-20 scale-110 opacity-100'
                          : isAdjacent
                          ? 'w-20 h-20 z-10 scale-90 opacity-70'
                          : 'w-16 h-16 z-0 scale-75 opacity-30'
                      }`}
                      style={{
                        left: `calc(50% + ${position * 120}px)`,
                        transform: 'translateX(-50%)',
                      }}
                      onClick={() => {
                        if (!isCenter) {
                          const newIndex = currentBrandIndex + position;
                          const normalizedIndex =
                            newIndex < 0
                              ? carouselBrands.length + (newIndex % carouselBrands.length)
                              : newIndex % carouselBrands.length;
                          if (normalizedIndex >= coreBrands.length) {
                            setCurrentBrandIndex(normalizedIndex % coreBrands.length || 0);
                          } else {
                            setCurrentBrandIndex(normalizedIndex);
                          }
                        }
                      }}
                    >
                      <div className={`rounded-xl overflow-hidden border bg-white/95 shadow-lg transition-all duration-300 cursor-pointer ${
                        isCenter ? 'border-primary/30' : 'border-border/50 hover:border-primary/20'
                      }`}>
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          fill
                          className={`object-contain ${brand.type === 'svg' ? 'p-3' : brand.type === 'png' ? 'p-2' : 'p-4'}`}
                          priority={index < 4}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Dots - Fixed */}
              <div className="flex justify-center space-x-2 mt-8">
                {coreBrands.map((brand, index) => {
                  // Calculate the correct active dot considering the seamless loop
                  let isActive = false;
                  if (currentBrandIndex === index + 1) {
                    isActive = true; // Normal case
                  } else if (currentBrandIndex === 0 && index === coreBrands.length - 1) {
                    isActive = true; // When we're at the prefix clone (showing last brand)
                  } else if (currentBrandIndex === carouselBrands.length - 1 && index === 0) {
                    isActive = true; // When we're at the suffix clone (showing first brand)
                  }

                  return (
                    <button
                      key={brand.id}
                      onClick={() => handleDotClick(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${isActive ? 'bg-primary scale-110' : 'bg-border hover:bg-muted-foreground'
                        }`}
                      aria-label={`Go to ${brand.name}`}
                      aria-current={isActive}
                    />
                  );
                })}
              </div>

              {/* Brand Names Display - Fixed */}
              <div className="mt-4 text-center">
                <h4 className="text-xl font-bold text-foreground mb-2">
                  {coreBrands.find((_, index) => {
                    // Map currentBrandIndex to the correct core brand
                    if (currentBrandIndex === 0) return index === coreBrands.length - 1; // Prefix clone shows last brand
                    if (currentBrandIndex === carouselBrands.length - 1) return index === 0; // Suffix clone shows first brand
                    return index === currentBrandIndex - 1; // Normal case
                  })?.name || coreBrands[0].name}
                </h4>
                <p className="text-muted-foreground">
                  Professional partnerships with leading automotive brands
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Continued */}
      <section className="py-0 bg-muted/20 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="testimonial-card bg-background rounded-lg border border-border p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-foreground mb-4 italic">
                "The AI inspection caught hidden engine issues that saved me from buying a lemon.
                Highly recommend for anyone buying a used car."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3 transition-colors duration-300">
                  <span className="text-sm font-semibold">JA</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">James A.</p>
                  <p className="text-xs text-muted-foreground">Nairobi</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card bg-background rounded-lg border border-border p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-foreground mb-4 italic">
                "Fast, thorough, and affordable. The detailed report with photos and AI analysis
                gave me total peace of mind about my purchase."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3 transition-colors duration-300">
                  <span className="text-sm font-semibold">ML</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Mary L.</p>
                  <p className="text-xs text-muted-foreground">Mombasa</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card bg-background rounded-lg border border-border p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-foreground mb-4 italic">
                "Professional service with cutting-edge technology. The inspection report
                was comprehensive and easy to understand."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3 transition-colors duration-300">
                  <span className="text-sm font-semibold">PK</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Peter K.</p>
                  <p className="text-xs text-muted-foreground">Kisumu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Metrics */}
          <div id="trust-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Inspections Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24hrs</div>
              <div className="text-muted-foreground">Report Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your complete journey from uncertain buyer to confident owner
            </p>
          </div>

          {/* Separate Sections */}
          {/* Pre-Purchase Journey Timeline */}
          <div id="pre-purchase" className="mb-32 lg:mb-40">
            <div className="text-center mb-16">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-primary">
                Your Pre-Purchase Journey
              </h3>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Gain complete confidence before you buy with our comprehensive inspection process
              </p>
            </div>

            {/* Timeline Container */}
            <div className="relative max-w-6xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-0.5 top-8 bottom-8 w-px bg-gradient-to-b from-primary via-secondary to-accent"></div>

              <div className="space-y-24 lg:space-y-32">
                {/* Step 1 */}
                <div className="timeline-step-1 relative flex items-center opacity-100 translate-x-0 scale-100 transition-all duration-700 ease-out">
                  <div className="w-1/2 pr-12 text-right">
                    <h4 className="text-2xl lg:text-3xl font-bold mb-4 text-primary">Book Your Analysis</h4>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-md ml-auto">
                      Tell us which car you're considering. It's fast, free, and puts you in control. Get personalized consultation and understand exactly what needs to be inspected.
                    </p>
                    <div className="inline-flex items-center gap-4 mt-6 bg-background/80 rounded-xl p-4 border border-border">
                      <div className="text-center">
                        <div className="text-xl font-bold text-primary mb-1">2 min</div>
                        <div className="text-xs text-muted-foreground">Booking time</div>
                      </div>
                      <div className="h-8 w-px bg-border"></div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-primary mb-1">Free</div>
                        <div className="text-xs text-muted-foreground">Consultation</div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Connector */}
                  <div className="flex-shrink-0 w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg z-10 transition-transform hover:scale-110">
                    <Car className="w-10 h-10" />
                  </div>

                  {/* Icon side */}
                  <div className="w-1/2 pl-12">
                    <div className="relative w-full h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-105 bg-gradient-to-br from-primary/10 to-secondary/5 border border-primary/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                          <Car className="w-12 h-12" />
                        </div>
                        <div className="inline-flex items-center gap-2 bg-white/90 rounded-lg px-4 py-2 text-sm font-medium shadow-md">
                          <Car className="w-4 h-4 text-primary" />
                          Step 1
                        </div>
                        <h5 className="text-lg font-bold mt-4 text-primary">Book Your Analysis</h5>
                        <p className="text-sm text-muted-foreground mt-2">Free consultation included</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="timeline-step-2 relative flex items-center opacity-100 translate-x-0 scale-100 transition-all duration-700 ease-out delay-200">
                  <div className="w-1/2 pr-12">
                    <div className="relative w-full h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-105 bg-gradient-to-br from-secondary/10 to-accent/5 border border-secondary/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                          <Settings className="w-12 h-12" />
                        </div>
                        <div className="inline-flex items-center gap-2 bg-white/90 rounded-lg px-4 py-2 text-sm font-medium shadow-md">
                          <Settings className="w-4 h-4 text-secondary" />
                          Step 2
                        </div>
                        <h5 className="text-lg font-bold mt-4 text-secondary">Inspections</h5>
                        <p className="text-sm text-muted-foreground mt-2">Hands-on AI diagnostics</p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Connector */}
                  <div className="flex-shrink-0 w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground shadow-lg z-10 transition-transform hover:scale-110">
                    <Settings className="w-10 h-10" />
                  </div>

                  <div className="w-1/2 pl-12">
                    <h4 className="text-2xl lg:text-3xl font-bold mb-4 text-secondary-foreground">I Perform the Deep-Dive</h4>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                      I meet you at the vehicle and perform a professional-grade inspection, so you see what I see. Advanced AI diagnostics combined with hands-on mechanic evaluation.
                    </p>
                    <div className="inline-flex items-center gap-4 mt-6 bg-background/80 rounded-xl p-4 border border-border">
                      <div className="text-center">
                        <div className="text-xl font-bold text-secondary-foreground mb-1">45 min</div>
                        <div className="text-xs text-muted-foreground">Inspection time</div>
                      </div>
                      <div className="h-8 w-px bg-border"></div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-secondary-foreground mb-1">92%</div>
                        <div className="text-xs text-muted-foreground">Issues detected</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="timeline-step-3 relative flex items-center opacity-100 translate-x-0 scale-100 transition-all duration-700 ease-out delay-400">
                  <div className="w-1/2 pr-12 text-right">
                    <h4 className="text-2xl lg:text-3xl font-bold mb-4 text-accent-foreground">Get Your Buy/No-Buy Report</h4>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-md ml-auto">
                      You receive a definitive report with a clear, data-backed recommendation and negotiation leverage. Make confident decisions with expert guidance.
                    </p>
                    <div className="inline-flex items-center gap-4 mt-6 bg-background/80 rounded-xl p-4 border border-border">
                      <div className="text-center">
                        <div className="text-xl font-bold text-accent-foreground mb-1">4 hrs</div>
                        <div className="text-xs text-muted-foreground">Report delivery</div>
                      </div>
                      <div className="h-8 w-px bg-border"></div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-accent-foreground mb-1">99.5%</div>
                        <div className="text-xs text-muted-foreground">Accuracy rate</div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Connector */}
                  <div className="flex-shrink-0 w-20 h-20 bg-accent rounded-full flex items-center justify-center text-accent-foreground shadow-lg z-10 transition-transform hover:scale-110">
                    <Shield className="w-10 h-10" />
                  </div>

                  {/* Icon side */}
                  <div className="w-1/2 pl-12">
                    <div className="relative w-full h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-105 bg-gradient-to-br from-accent/10 to-primary/5 border border-accent/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                          <Shield className="w-12 h-12" />
                        </div>
                        <div className="inline-flex items-center gap-2 bg-white/90 rounded-lg px-4 py-2 text-sm font-medium shadow-md">
                          <Shield className="w-4 h-4 text-accent" />
                          Step 3
                        </div>
                        <h5 className="text-lg font-bold mt-4 text-accent">Reports</h5>
                        <p className="text-sm text-muted-foreground mt-2">Clear recommendations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-16">
                <Link href="/auth/signup">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all">
                    Start Your Pre-Purchase Analysis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Post-Purchase Perks - Premium Edition */}
          <div id="post-purchase" className="mb-32 lg:mb-40 relative">
            {/* Premium Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/10 via-gray-50/5 to-slate-100/10 dark:from-slate-900/10 dark:via-gray-900/5 dark:to-slate-800/10 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(148,163,184,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_30%_20%,rgba(30,41,59,0.1),transparent_60%)] pointer-events-none" />

            <div className="text-center mb-16 relative z-10">
              <div className="inline-flex items-center rounded-full border border-slate-200/30 bg-white/60 backdrop-blur-md px-6 py-3 mb-6 dark:bg-slate-900/60 dark:border-slate-700/30 shadow-sm">
                <Star className="w-4 h-4 mr-2 text-amber-500 fill-current" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">VIP Member Benefits</span>
              </div>
              <h3 className="text-3xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-800 via-gray-700 to-slate-600 bg-clip-text text-transparent dark:from-slate-200 dark:via-gray-100 dark:to-slate-300 tracking-tight">
                Your Post-Purchase Perks
              </h3>
              <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                Discover the exclusive premium benefits that come with being a 4RealKE member
              </p>
            </div>

            <div className="max-w-6xl mx-auto space-y-20 relative z-10">
              {/* Step 4: Join Membership - Premium */}
              <div className={`post-step flex flex-col lg:flex-row items-center gap-12 lg:gap-16 transition-all duration-1000 ${postPurchaseVisible.includes(0) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                }`}>
                <div className="flex-1">
                  <div className="relative w-full h-96 bg-gradient-to-br from-slate-800 via-gray-700 to-slate-600 rounded-2xl shadow-lg p-10 flex items-center overflow-hidden group hover:shadow-xl transition-all duration-500">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/5 to-transparent" />
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                    <div className="relative text-center lg:text-left z-10">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-8 text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <span className="text-xl font-semibold">4</span>
                        <Award className="w-8 h-8 ml-1" />
                      </div>
                      <h4 className="text-3xl lg:text-4xl font-bold mb-6 text-white tracking-tight">Lifetime Membership</h4>
                      <p className="text-lg text-slate-200/90 leading-relaxed font-light">Exclusive club benefits activated instantly</p>
                      <div className="mt-6 inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/20">
                        <Star className="w-4 h-4 mr-2 fill-current" />
                        Premium Access
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-slate-800 to-gray-600 bg-clip-text text-transparent dark:from-slate-200 dark:to-gray-400 tracking-tight">
                    Join the Elite Club
                  </h3>
                  <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-light">
                    The moment you purchase an inspection, you unlock lifetime access to our exclusive member community with unparalleled benefits and priority treatment.
                  </p>
                  <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl p-8 border border-slate-200/30 dark:border-slate-700/30 shadow-sm">
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-gray-600 bg-clip-text text-transparent dark:from-slate-200 dark:to-gray-400 mb-2 tracking-tight">
                        Lifetime Access
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 text-sm font-light">No recurring fees • Forever yours</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Member-Only Discounts - Premium */}
              <div className={`post-step flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16 transition-all duration-1000 delay-200 ${postPurchaseVisible.includes(1) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                }`}>
                <div className="flex-1">
                  <div className="relative w-full h-96 bg-gradient-to-br from-slate-700 via-gray-600 to-slate-500 rounded-2xl shadow-lg p-10 flex items-center overflow-hidden group hover:shadow-xl transition-all duration-500">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/5 to-transparent" />
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                    <div className="relative text-center lg:text-left z-10">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-400 to-gray-300 rounded-full mb-8 text-slate-800 shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <Award className="w-8 h-8" />
                      </div>
                      <h4 className="text-3xl lg:text-4xl font-bold mb-6 text-white tracking-tight">Exclusive Discounts</h4>
                      <p className="text-lg text-slate-200/90 leading-relaxed font-light">Save on premium car care services</p>
                      <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
                        <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white border border-white/20">
                          <DollarSign className="w-3 h-3 mr-1" />
                          Service Discounts
                        </span>
                        <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white border border-white/20">
                          <Settings className="w-3 h-3 mr-1" />
                          Maintenance
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-right">
                  <h3 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-slate-700 to-gray-600 bg-clip-text text-transparent tracking-tight">
                    Exclusive Member Savings
                  </h3>
                  <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-light">
                    Unlock incredible savings on all your automotive needs. From routine maintenance to premium detailing services, get up to 30% off everything through our exclusive partner network.
                  </p>
                  <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl p-8 border border-slate-200/30 dark:border-slate-700/30 shadow-sm">
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-gray-600 bg-clip-text text-transparent mb-2 tracking-tight">
                        Up to 30% Off
                      </div>
                      <div className="text-slate-600 dark:text-slate-400 text-sm font-light">Premium services & maintenance</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Priority Services & Custom Advice - Premium */}
              <div className={`post-step flex flex-col lg:flex-row items-center gap-12 lg:gap-16 transition-all duration-1000 delay-400 ${postPurchaseVisible.includes(2) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                }`}>
                <div className="flex-1">
                  <div className="relative w-full h-96 bg-gradient-to-br from-teal-600/90 via-blue-600/90 to-purple-600/90 rounded-2xl shadow-lg p-10 flex items-center overflow-hidden group hover:shadow-xl transition-all duration-500">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/5 to-transparent" />
                    <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                    <div className="relative text-center lg:text-left z-10">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mb-8 text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <h4 className="text-3xl lg:text-4xl font-bold mb-6 text-white tracking-tight">Priority Support</h4>
                      <p className="text-lg text-slate-200/90 leading-relaxed font-light">24/7 expert assistance when you need it</p>
                      <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
                        <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white border border-white/30">
                          <Phone className="w-3 h-3 mr-1" />
                          Direct Support
                        </span>
                        <span className="inline-flex items-center rounded-full bg-yellow-500/20 backdrop-blur-sm px-3 py-1 text-sm font-medium text-yellow-200 border border-yellow-500/30">
                          <Clock className="w-3 h-3 mr-1" />
                          Fast Response
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-slate-800 to-gray-600 bg-clip-text text-transparent dark:from-slate-200 dark:to-gray-400 tracking-tight">
                    Premium Support Experience
                  </h3>
                  <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-light">
                    Skip the wait times and get direct access to our automotive experts. Your questions answered instantly, your concerns addressed immediately.
                  </p>
                  <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl p-8 border border-slate-200/30 dark:border-slate-700/30 shadow-sm">
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-gray-600 bg-clip-text text-transparent dark:from-slate-200 dark:to-gray-400 mb-2 tracking-tight">
                        24/7 Priority Support
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 text-sm font-light">Direct expert access • Unlimited queries</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
          {/* CTA Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <h4 className="text-xl font-bold mb-4">Ready to Start Your Journey?</h4>
              <p className="text-muted-foreground mb-6">
                Get your personalized inspection analysis today
              </p>
              <Link href="/auth/signup">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all">
                  Start Free Analysis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-gray-700/5 to-gray-700/10 border border-gray-700/20 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <h4 className="text-xl font-bold mb-4">Already Own Your Car?</h4>
              <p className="text-muted-foreground mb-6">
                Join thousands of members enjoying exclusive perks
              </p>
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white shadow-md hover:shadow-lg transition-all">
                  Become a Member
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-muted/10 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20 px-8 py-6">
            <h2 className="faq-title text-3xl lg:text-4xl font-bold mb-6">Pre-Purchase Inspection FAQ</h2>
            <p className="faq-title text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your essential questions answered by our AI-powered inspection experts specializing in Kenya's used car market.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                icon: Brain,
                question: "What makes 4RealKE different from other car inspection services?",
                answer: "4RealKE combines AI-powered neural network analysis with professional mechanical expertise for Kenya's unique used car market. Our proprietary algorithms detect issues traditional inspections miss, while our East African market knowledge ensures you get accurate valuations and negotiation strategies specific to Kenya's automotive landscape."
              },
              {
                icon: Eye,
                question: "Can I see what issues 4RealKE has detected on my potential purchase?",
                answer: "Absolutely. You witness our professional inspection in person, so you see what I see. Our detailed reports include high-resolution photos, AI-detected problem highlight reels, and clear explanations. No hidden surprises - you participate in the discovery process and get leverage to negotiate better prices."
              },
              {
                icon: Clock,
                question: "How quickly will I get my inspection results?",
                answer: "Within 4 hours of completing your inspection, you'll receive a comprehensive Buy/No-Buy recommendation report. This includes AI analysis, photos, cost estimates for repairs, market valuation, and specific negotiation talking points. Most clients make confident purchasing decisions the same day."
              },
              {
                icon: Award,
                question: "What benefits come with becoming a 4RealKE member?",
                answer: "Membership unlocks exclusive perks including up to 30% off future inspections, priority booking, custom vehicle advice, dedicated support line, and access to our premium car care network. Every inspection purchase activates lifetime benefits with no recurring fees."
              },
              {
                icon: Shield,
                question: "How does 4RealKE protect me from buying a problematic used car?",
                answer: "We provide iron-clad confidence through data-backed recommendations, East African market expertise, and post-purchase support. Our AI analyzes 50+ critical components, cross-references regional databases, and gives you the leverage to negotiate fair prices or walk away confidently."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-background rounded-lg border border-border overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <faq.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold text-foreground leading-tight">
                      {index + 1}. {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`transform transition-transform duration-300 flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''
                      }`}
                  >
                    <Wrench className="w-5 h-5 text-primary/60" />
                  </div>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6">
              Still have questions about your pre-purchase inspection?
            </p>
            <Link href="/auth/signup">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all">
                Book Your AI Inspection Today
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Know Your Car?</h2>
          <p className="text-lg lg:text-xl opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of confident vehicle buyers in Kenya. Get your professional AI inspection today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="h-14 px-10 text-lg shadow-xl hover:shadow-2xl transition-shadow">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary shadow-xl hover:shadow-2xl transition-all">
              <Phone className="w-5 h-5 mr-2" />
              Call Us Today
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-8">
            No payment required for initial consultation • 24/7 support available
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                  <Image
                    src="/4RealKE.webp"
                    alt="4RealKE Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                {/* <span className="text-xl font-bold tracking-tight">4RealKE</span> */}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Professional AI-powered vehicle inspections for confident buying decisions in Kenya.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <div className="space-y-2">
                <p><Link href="/inspection" className="text-sm text-muted-foreground hover:text-foreground">Pre-Purchase Inspection</Link></p>
                <p><Link href="/valuation" className="text-sm text-muted-foreground hover:text-foreground">Used Car Valuation</Link></p>
                <p><Link href="/history" className="text-sm text-muted-foreground hover:text-foreground">Car History Report</Link></p>
                <p><Link href="/insurance" className="text-sm text-muted-foreground hover:text-foreground">Insurance Assessment</Link></p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2">
                <p><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></p>
                <p><Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link></p>
                <p><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></p>
                <p><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <p><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></p>
                <p><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link></p>
                <p><Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">Cookie Policy</Link></p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 4RealKE. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Link href="mailto:contact@4realke.com" className="text-sm text-muted-foreground hover:text-foreground flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                contact@4realke.com
              </Link>
              <Link href="tel:+254700000000" className="text-sm text-muted-foreground hover:text-foreground flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                +254 700 000 000
              </Link>
              <div className="text-sm text-muted-foreground flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Nairobi, Kenya
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
