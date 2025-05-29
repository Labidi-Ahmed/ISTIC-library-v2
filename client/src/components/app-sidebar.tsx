import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import {UserNav} from '@/features/auth/components/UserNav';
import {Book, Files, Folder, VerifiedIcon} from 'lucide-react';
import {Link} from 'react-router-dom';

export function AppSidebar() {
  // Reports navigation items array
  const reportsNavItems = [
    {
      title: 'Validate Report',
      icon: VerifiedIcon,
      url: '/app/validate',
      tooltip: 'Validate existing report',
    },
  ];

  // Discover navigation items array
  const discoverNavItems = [
    {
      title: 'Books',
      icon: Book,
      url: '/app/books',
      tooltip: 'Browse books',
    },
    {
      title: 'Reports',
      icon: Folder,
      url: '/app/reports',
      tooltip: 'Browse reports',
    },
    {
      title: 'Research Documents',
      icon: Files,
      url: '/app/documents',
      tooltip: 'Browse research documents',
    },
  ];

  return (
    <>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5">
                <a href="#">
                  <span className="text-base font-semibold font-mono">
                    Istic Library
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {/* Reports Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Reports</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {reportsNavItems.map((item, index) => (
                  <SidebarMenuItem key={`report-${index}`} className="">
                    <SidebarMenuButton tooltip={item.tooltip} asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Discover Section */}
          <SidebarGroup className="">
            <SidebarGroupLabel className="text-muted-foreground">
              Discover
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {discoverNavItems.map((item, index) => (
                  <SidebarMenuButton
                    key={`discover-${index}`}
                    tooltip={item.tooltip}
                    asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="">
          <SidebarMenu>
            <SidebarMenuItem>
              <UserNav />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
