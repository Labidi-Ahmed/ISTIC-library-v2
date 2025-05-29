import {CreditCard, LogOut, Crown, Loader2} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {SidebarMenuButton} from '@/components/ui/sidebar';
import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';
import {useUserStore} from '@/stores/userStore';
import useLogout from '@/features/auth/hooks/useLogout';

export function UserMenu() {
  const navigate = useNavigate();
  const {user} = useUserStore();
  const {logout, logoutLoading} = useLogout();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="w-full justify-start py-6 gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback>
              {user.username ? user.username.slice(0, 1).toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-left">
            <span className="text-sm font-medium">{user.username}</span>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{user.subscriptionPlan}</span>
              <span className="w-px h-3 bg-muted-foreground/50" />
              <span>{user.creditBalance} Credit</span>
            </div>
          </div>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56   rounded-xl p-2 ">
        <DropdownMenuLabel className="font-normal text-sm text-muted-foreground">
          <span>{user.email}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate('/app/payment')}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem
          onClick={() => {
            logout();
          }}
          disabled={logoutLoading}
          className="relative ">
          {logoutLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 h-4 w-4 " />
          )}
          <span className="">Sign Out</span>
        </DropdownMenuItem>
        {user.subscriptionPlan === 'free' && (
          <>
            {' '}
            <DropdownMenuSeparator />
            <Button
              onClick={() => {
                navigate('/app/payment');
              }}
              className="w-full h-8 bg-landing/80 text-foreground hover:bg-landing">
              {' '}
              <Crown />
              Upgrade Plan
            </Button>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
