import {Button} from '@/components/ui/button';
import {Loader2} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import type {Chat} from '@/stores/chatsStore';

interface DeleteConfirmationProps {
  handleDeleteChat: () => void;
  chatToDelete: Chat | null;
  setChatToDelete: (chat: Chat | null) => void;
  isPending: boolean;
}

export default function DeleteConfirmation({
  handleDeleteChat,
  chatToDelete,
  setChatToDelete,
  isPending,
}: DeleteConfirmationProps) {
  return (
    <AlertDialog open={!!chatToDelete}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            This action cannot be undone. This will permanently delete your chat
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 ">
          <Button
            variant="outline"
            disabled={isPending}
            onClick={() => setChatToDelete(null)}
            className="mt-0">
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              handleDeleteChat();
            }}
            className="gap-2">
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
