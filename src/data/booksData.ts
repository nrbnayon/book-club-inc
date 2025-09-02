import type { GenericDataItem } from "../types/dynamicCardTypes";

export interface BookDataItem extends GenericDataItem {
  id: string;
  book_name?: string;
  description?: string;
  image?: string;
  book_pdf?: string;
  book_price?: string;
  [key: string]: unknown;
}

export const booksData: BookDataItem[] = [
  {
    id: "book1",
    book_name: "The Great Gatsby",
    description:
      "A classic novel by F. Scott Fitzgerald, exploring themes of wealth, love, and the American Dream in the 1920s.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center",
    book_pdf: "https://www.planetebook.com/free-ebooks/the-great-gatsby.pdf",
    book_price: "$9.99",
  },
  {
    id: "book2",
    book_name: "To Kill a Mockingbird",
    description:
      "Harper Lee's Pulitzer Prize-winning novel about racial injustice and the loss of innocence in a small Southern town.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&crop=center",
    book_pdf:
      "https://www.penguinrandomhouse.com/books/29570/to-kill-a-mockingbird-by-harper-lee/sample.pdf",
    book_price: "$12.99",
  },
  {
    id: "book3",
    book_name: "1984",
    description:
      "George Orwell's dystopian novel depicting a totalitarian society under constant surveillance.",
    image:
      "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&h=600&fit=crop&crop=center",
    book_pdf: "https://www.planetebook.com/free-ebooks/1984.pdf",
    book_price: "$11.50",
  },
  {
    id: "book4",
    book_name: "Pride and Prejudice",
    description:
      "Jane Austen's timeless romance novel exploring love, class, and social expectations in 19th-century England.",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop&crop=center",
    book_pdf: "https://www.planetebook.com/free-ebooks/pride-and-prejudice.pdf",
    book_price: "$8.99",
  },
  {
    id: "book5",
    book_name: "The Catcher in the Rye",
    description:
      "J.D. Salinger's novel about teenage angst and alienation, following the story of Holden Caulfield.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop&crop=center",
    book_pdf:
      "https://www.penguinrandomhouse.com/books/67529/the-catcher-in-the-rye-by-jd-salinger/sample.pdf",
    book_price: "$10.99",
  },
  {
    id: "book6",
    book_name: "Brave New World",
    description:
      "Aldous Huxley's dystopian novel exploring a futuristic society driven by technology and conformity.",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop&crop=center",
    book_pdf: "https://www.huxley.net/bnw/bravenewworld.pdf",
    book_price: "$11.99",
  },
  {
    id: "book7",
    book_name: "Jane Eyre",
    description:
      "Charlotte Brontë's novel about a young woman's journey through hardship, love, and self-discovery.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop&crop=center",
    book_pdf: "https://www.planetebook.com/free-ebooks/jane-eyre.pdf",
    book_price: "$9.50",
  },
  {
    id: "book8",
    book_name: "The Hobbit",
    description:
      "J.R.R. Tolkien's fantasy novel about Bilbo Baggins' adventure with dwarves and a dragon.",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=center",
    book_pdf: "https://www.hmhco.com/content/literature/the_hobbit_sample.pdf",
    book_price: "$14.99",
  },
  {
    id: "book9",
    book_name: "Fahrenheit 451",
    description:
      "Ray Bradbury's dystopian novel about a future where books are banned and 'firemen' burn them.",
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=400&h=600&fit=crop&crop=center",
    book_pdf:
      "https://www.simonandschuster.com/books/Fahrenheit-451/Ray-Bradbury/sample.pdf",
    book_price: "$10.50",
  },
  {
    id: "book10",
    book_name: "Moby-Dick",
    description:
      "Herman Melville's epic tale of Captain Ahab's obsessive quest to hunt the white whale.",
    image:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop&crop=center",
    book_pdf: "https://www.planetebook.com/free-ebooks/moby-dick.pdf",
    book_price: "$13.99",
  },
];
