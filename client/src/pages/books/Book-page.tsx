import {BookList} from '@/components/books/book-list';
import {SearchFilters} from '@/components/books/search-filters';
import type {Book} from '@/types';

export const booksData: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    description:
      'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    coverImage: 'https://images.penguinrandomhouse.com/cover/9780525559474',
    genres: ['Fiction', 'Fantasy', 'Contemporary'],
    language: 'English',
    publicationDate: '2020-08-13',
    format: ['E-Book', 'Audiobook', 'Physical'],
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    description:
      'An easy and proven way to build good habits and break bad ones. Tiny changes, remarkable results.',
    coverImage:
      'https://images-na.ssl-images-amazon.com/images/I/81bGKUa1e0L.jpg',
    genres: ['Self-Help', 'Non-Fiction', 'Psychology'],
    language: 'English',
    publicationDate: '2018-10-16',
    format: ['E-Book', 'Audiobook'],
  },
  {
    id: '3',
    title: 'Dune',
    author: 'Frank Herbert',
    description:
      'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.',
    coverImage:
      'https://images-na.ssl-images-amazon.com/images/I/81S7+8xlE9L.jpg',
    genres: ['Science Fiction', 'Fantasy', 'Classic'],
    language: 'English',
    publicationDate: '1965-08-01',
    format: ['E-Book', 'Physical'],
  },
  {
    id: '4',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    description:
      "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house in one of London's most desirable areas.",
    coverImage:
      'https://images-na.ssl-images-amazon.com/images/I/91lslnZ1a8L.jpg',
    genres: ['Thriller', 'Mystery', 'Fiction'],
    language: 'English',
    publicationDate: '2019-02-05',
    format: ['E-Book', 'Audiobook', 'Physical'],
  },
  {
    id: '5',
    title: 'Educated',
    author: 'Tara Westover',
    description:
      'A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
    coverImage:
      'https://images-na.ssl-images-amazon.com/images/I/81WojUc4+ZL.jpg',
    genres: ['Biography', 'Memoir', 'Non-Fiction'],
    language: 'English',
    publicationDate: '2018-02-20',
    format: ['E-Book', 'Audiobook'],
  },
  {
    id: '6',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description:
      'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep.',
    coverImage:
      'https://images-na.ssl-images-amazon.com/images/I/710+HcoP38L.jpg',
    genres: ['Fantasy', 'Classic', 'Adventure'],
    language: 'English',
    publicationDate: '1937-09-21',
    format: ['E-Book', 'Audiobook', 'Physical'],
  },
  {
    id: '7',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    description:
      "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl.",
    coverImage:
      'https://images-na.ssl-images-amazon.com/images/I/81O1LFv5HbL.jpg',
    genres: ['Fiction', 'Mystery', 'Literary Fiction'],
    language: 'English',
    publicationDate: '2018-08-14',
    format: ['E-Book', 'Audiobook', 'Physical'],
  },
  {
    id: '8',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    description:
      "A groundbreaking narrative of humanity's creation and evolution that explores the ways in which biology and history have defined us.",
    coverImage:
      'https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg',
    genres: ['History', 'Non-Fiction', 'Science'],
    language: 'English',
    publicationDate: '2014-02-10',
    format: ['E-Book', 'Audiobook'],
  },
];

export default function ELibraryPage() {
  return (
    <div className="">
      <header className="container mx-auto ">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          ISTIC-Library
        </h1>
        <p className="text-muted-foreground">
          Discover your next favorite book from our collection
        </p>
      </header>

      <div className="w-full bg-background  sticky top-0 z-50 border-b">
        <div className="container mx-auto py-4 pb-6">
          <SearchFilters />
        </div>
      </div>

      <main className="mt-8 container mx-auto px-4 py-8 ">
        <BookList books={booksData} />
      </main>
    </div>
  );
}
