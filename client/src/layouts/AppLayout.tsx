import {Outlet} from 'react-router-dom';

import {SidebarInset, SidebarProvider} from '@/components/ui/sidebar';
import {AppSidebar} from '@/components/app-sidebar';
import {TooltipProvider} from '@/components/ui/tooltip';
import SidebarHeader from '@/components/SidebarHeader';

export default function AppLayout() {
  return (
    <>
      <TooltipProvider delayDuration={100}>
        <SidebarProvider>
          <AppSidebar />

          <SidebarInset className="">
            <SidebarHeader />
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>

      {/* Move SupportBubble outside of the main layout */}
      {/* <SupportBubble /> */}
    </>
  );
}
