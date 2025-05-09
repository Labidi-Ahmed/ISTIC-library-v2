import {SidebarTrigger} from '@/components/ui/sidebar';
import {Tooltip, TooltipContent, TooltipTrigger} from './ui/tooltip';

import {PanelLeftIcon} from 'lucide-react';

import {cn} from '@/lib/utils';
import {Badge} from './ui/badge';
export default function SidebarHeader() {
  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2 z-10">
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger className="p-4 border"></SidebarTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="start">
          Toggle sidebar{' '}
          <Badge
            variant="outline"
            className="ml-1 bg-muted text-foreground font-mono rounded">
            Ctrl
          </Badge>{' '}
          <Badge
            className="bg-muted text-foreground font-mono rounded"
            variant="outline">
            B
          </Badge>
        </TooltipContent>
      </Tooltip>

      {/* <Button
        className="bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-900 hidden md:flex py-1.5 px-2 h-fit md:h-[34px] order-4 md:ml-auto"
        asChild
      >
        <div>
          <Download size={16} />
          Download pdf
        </div>
      </Button> */}
    </header>
  );
}
