import { Link } from '@tanstack/react-router';
import { PackageIcon, UsersIcon } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@use-it/ui/components/sidebar';

import RoleGuard from '@/guards/role';

export default function AppSidebar() {
  return (
    <Sidebar className="bg-background">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <RoleGuard roles={['admin']}>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenuItem>
                <SidebarMenuButton variant="outline" asChild>
                  <Link to="/users">
                    <UsersIcon className="size-4" />
                    <p>Users</p>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton variant="outline" asChild>
                  <Link to="/materials">
                    <PackageIcon className="size-4" />
                    <p>Materials</p>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>
        </RoleGuard>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
