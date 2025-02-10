import { Toaster } from '@repo/ui/components/sonner';
import { ThemeProvider } from '@repo/ui/components/theme-provider';
import { TooltipProvider } from '@repo/ui/components/tooltip';
import { ReactNode } from 'react';

export default function UiProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="thusa-theme">
      <div className="flex flex-col w-screen h-screen bg-muted font-montserrat">
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </div>
    </ThemeProvider>
  );
}
