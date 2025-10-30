'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X } from 'lucide-react';

interface HeaderProps {
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

export default function Header({ onThemeToggle, isDarkMode }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 w-full z-50 bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">{`{4real.ke}`}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="hover:text-gray-300 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="hover:text-gray-300 transition-colors">
              Pricing
            </Link>
            <Link href="/signup" className="hover:text-gray-300 transition-colors">
              Sign Up
            </Link>
            <Link href="/login" className="hover:text-gray-300 transition-colors">
              Login
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={onThemeToggle}
              className="border-gray-600 text-white hover:bg-gray-800"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={onThemeToggle}
              className="border-gray-600 text-white hover:bg-gray-800 mr-2"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-700 mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-white hover:text-gray-300 transition-colors py-2"
                onClick={toggleMenu}
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-white hover:text-gray-300 transition-colors py-2"
                onClick={toggleMenu}
              >
                Pricing
              </Link>
              <Link
                href="/signup"
                className="text-white hover:text-gray-300 transition-colors py-2"
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="text-white hover:text-gray-300 transition-colors py-2"
                onClick={toggleMenu}
              >
                Login
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
