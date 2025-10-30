'use client'

import * as React from 'react'
import { Moon, Sun, Monitor, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const getIcon = () => {
    switch (theme) {
      case 'dark':
        return Moon
      case 'light':
        return Sun
      default:
        return Monitor
    }
  }

  const themeItems = [
    { value: 'system', label: 'System', icon: Monitor, description: 'Follow system preference' },
    { value: 'light', label: 'Light', icon: Sun, description: 'Always use light mode' },
    { value: 'dark', label: 'Dark', icon: Moon, description: 'Always use dark mode' },
  ]

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Button
            variant="outline"
            size="sm"
            className="relative h-9 w-9 rounded-lg border-neutral-200 bg-white/80 backdrop-blur-sm hover:bg-neutral-100/80 dark:border-neutral-700 dark:bg-neutral-900/80 dark:hover:bg-neutral-800/80 transition-all duration-200 group overflow-hidden"
            aria-label={`Current theme: ${theme || 'system'}. Click to change theme`}
          >
            {/* Glass morphism background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            <motion.div
              key={theme}
              initial={{ scale: 0.5, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 90 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                duration: 0.3
              }}
              className="relative z-10"
            >
              {React.createElement(getIcon(), {
                className: 'h-4 w-4 text-neutral-700 dark:text-neutral-300'
              })}
            </motion.div>

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute -bottom-1 -right-1 h-3 w-3 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center"
            >
              <ChevronDown className="h-2 w-2 text-neutral-500" />
            </motion.div>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>

      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent
            align="end"
            className="w-64 p-2 border-neutral-200 bg-white/95 backdrop-blur-lg shadow-xl dark:border-neutral-700 dark:bg-neutral-900/95"
            sideOffset={8}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {themeItems.map((item, index) => {
                const IconComponent = item.icon
                const isActive = theme === item.value

                return (
                  <motion.div
                    key={item.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.15 }}
                  >
                    <DropdownMenuItem
                      onClick={() => {
                        setTheme(item.value)
                        setIsOpen(false)
                      }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 ${
                        isActive
                          ? 'bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 dark:bg-blue-500/10'
                          : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <div className={`p-2 rounded-lg transition-colors duration-150 ${
                        isActive
                          ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
                          : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400'
                      }`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${isActive ? 'text-blue-700 dark:text-blue-300' : 'text-neutral-900 dark:text-neutral-100'}`}>
                          {item.label}
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          {item.description}
                        </div>
                      </div>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-blue-500 rounded-full"
                        />
                      )}
                    </DropdownMenuItem>
                  </motion.div>
                )
              })}
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  )
}
