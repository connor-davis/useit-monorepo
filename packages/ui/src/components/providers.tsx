import { ReactNode } from 'react';

import { Toaster } from '@use-it/ui/components/sonner';
import { ThemeProvider } from '@use-it/ui/components/theme-provider';
import { TooltipProvider } from '@use-it/ui/components/tooltip';

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
