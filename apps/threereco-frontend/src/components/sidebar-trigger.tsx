import { MenuIcon } from 'lucide-react';

import { Button } from '@use-it/ui/components/button';
import { useSidebar } from '@use-it/ui/components/sidebar';

export default function SidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button variant="outline" size="icon" onClick={() => toggleSidebar()}>
      <MenuIcon className="size-4" />
    </Button>
  );
}
