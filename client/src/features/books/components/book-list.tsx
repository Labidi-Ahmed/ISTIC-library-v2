import {useState} from 'react';
import type {Book} from '@/types';
import {BookCard} from '@/components/books/book-card';
import {Button} from '@/components/ui/button';
import {Grid, List} from 'lucide-react';

interface BookListProps {
  books: Book[];
}

export function BookList({books}: BookListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">All Books ({books.length})</h2>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
            aria-label="Grid view">
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
            aria-label="List view">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6  gap-3 md:gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {books.map((book) => (
            <div key={book.id} className="flex gap-4 p-4 border rounded-lg">
              <div className="shrink-0">
                <img
                  src={book.coverImage || '/placeholder.svg'}
                  alt={book.title}
                  width={80}
                  height={120}
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-muted-foreground">
                  by {book.author}
                </p>
                <p className="text-sm mt-2 line-clamp-2">{book.description}</p>
                <div className="mt-auto pt-2 flex gap-2">
                  <Button size="sm" variant="outline">
                    Details
                  </Button>
                  <Button size="sm">Read Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
