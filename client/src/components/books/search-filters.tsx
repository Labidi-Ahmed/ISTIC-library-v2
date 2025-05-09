import {useState} from 'react';
import {Search, SlidersHorizontal, X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Checkbox} from '@/components/ui/checkbox';
import {Label} from '@/components/ui/label';

export function SearchFilters() {
  const [searchQuery, setSearchQuery] = useState('');

  const genres = [
    'Fiction',
    'Non-Fiction',
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'Romance',
    'Biography',
    'History',
    'Self-Help',
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title, author, or keyword..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Filter books">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Sort By</h3>
                <Select defaultValue="relevance">
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="title-asc">Title: A-Z</SelectItem>
                    <SelectItem value="title-desc">Title: Z-A</SelectItem>
                    <SelectItem value="author-asc">Author: A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Genres</h3>
                <div className="grid grid-cols-2 gap-2">
                  {genres.map((genre) => (
                    <div key={genre} className="flex items-center space-x-2">
                      <Checkbox id={`genre-${genre}`} />
                      <Label
                        htmlFor={`genre-${genre}`}
                        className="text-sm font-normal">
                        {genre}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Availability</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="available-ebook" />
                    <Label
                      htmlFor="available-ebook"
                      className="text-sm font-normal">
                      E-Book
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="available-audiobook" />
                    <Label
                      htmlFor="available-audiobook"
                      className="text-sm font-normal">
                      Audiobook
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="available-physical" />
                    <Label
                      htmlFor="available-physical"
                      className="text-sm font-normal">
                      Physical Copy
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1">
                  Reset
                </Button>
                <Button className="flex-1">Apply Filters</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-wrap gap-2">
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="fiction">Fiction</SelectItem>
            <SelectItem value="non-fiction">Non-Fiction</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
            <SelectItem value="children">Children</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
            <SelectItem value="french">French</SelectItem>
            <SelectItem value="german">German</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
