import type {Book} from '@/features/books/types';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardFooter} from '@/components/ui/card';
import {BookOpen} from 'lucide-react';
import {cn} from '@/lib/utils';

interface BookCardProps {
  book: Book;
  className?: string;
}

export function BookCard({book, className}: BookCardProps) {
  return (
    <Card
      className={cn(
        'group relative h-full overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-4px] p-0 ',
        className
      )}>
      <div className="relative h-full">
        {/* Cover Image */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={book.coverImage || '/placeholder.svg?height=300&width=200'}
            alt={book.title}
            className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
          />
        </div>

        {/* Status indicator - always visible */}
        {book.status && (
          <div className="absolute top-3 right-3 z-20">
            <Badge className="bg-primary text-primary-foreground font-medium shadow-md">
              {book.status}
            </Badge>
          </div>
        )}

        {/* CardFooter - visible when not hovering */}
        <CardFooter className="flex flex-col text-center py-3">
          <div className="font-medium">{book.title}</div>
          <p className="text-muted-foreground text-xs mt-1">by {book.author}</p>
        </CardFooter>

        {/* Dark overlay that covers the entire card - shown on hover */}
        <div className="absolute inset-0 bg-black/80 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-4">
          <div className="mb-auto">
            {/* Title and author */}
            <h3 className="font-bold text-white text-lg mb-1">{book.title}</h3>
            <p className="text-white/90 text-sm mb-3">by {book.author}</p>

            {/* Brief description */}
            {book.description && (
              <p className="text-white/90 text-xs mb-3 line-clamp-3">
                {book.description}
              </p>
            )}

            {/* Genres */}
            <div className="flex flex-wrap gap-1 mb-4">
              {book.genres.map((genre) => (
                <Badge
                  key={genre}
                  variant="outline"
                  className="bg-black/50 text-white border-white/30 backdrop-blur-sm text-xs">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action button at bottom */}
          <Button
            size="sm"
            className="w-full cursor-pointer bg-primary hover:bg-primary/90 mt-auto">
            <BookOpen className="h-4 w-4 mr-2" />
            Borrow Now
          </Button>
        </div>
      </div>
    </Card>
  );
}
