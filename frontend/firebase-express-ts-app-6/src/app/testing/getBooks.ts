import { Book } from '../interfaces/book.interface';

export function getBooksForTest(): Book[] {
  const books: Book[] = [
    {
      id: '1',
      title: 'title #1',
      description: 'description #1',
      content: 'content #1',
      rating: 1,
    },
    {
      id: '2',
      title: 'title #2',
      description: 'description #2',
      content: 'content #2',
      rating: 2,
    },
    {
      id: '3',
      title: 'title #3',
      description: 'description #3',
      content: 'content #3',
      rating: 3,
    },
    {
      id: '4',
      title: 'title #4',
      description: 'description #4',
      content: 'content #4',
      rating: 4,
    },
    {
      id: '5',
      title: 'title #5',
      description: 'description #5',
      content: 'content #5',
      rating: 5,
    },
  ];

  return books;
}
