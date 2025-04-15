import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BookStatus = "want" | "reading" | "finished";

export type Book = {
  id: number;
  title: string;
  author: string;
  totalPages: number;
  status: BookStatus;
  currentPage: number;
};

type BooksState = {
  books: Book[];
  currentBookId: number | null;
  /**
   * Reading progress
   * key date format - yyyy-mm-dd
   */
  progress: Record<string, number>;
};

type Actions = {
  addBook: (book: Omit<Book, "id" | "currentPage">) => void;
  updateBook: (id: number, updates: Partial<Book>) => void;
  deleteBook: (id: number) => void;
  markAsRead: (id: number) => void;
  startReading: (id: number) => void;
  rereadBook: (id: number) => void;
  setCurrentBook: (id: number) => void;
  updateProgress: (date: Date, progressValue: number) => void;
  updateTodayProgress: (progressValue: number) => void;
};

export const useRemindersStore = create<BooksState & Actions>()(
  persist(
    (set) => ({
      books: [],
      currentBookId: null,
      progress: {},

      addBook: (book) =>
        set((state) => {
          const id = Date.now();
          const newBook: Book = { ...book, id, currentPage: 0 };
          return {
            books: [...state.books, newBook],
          };
        }),

      updateBook: (id, updates) =>
        set((state) => ({
          books: state.books.map((book) =>
            book.id === id ? { ...book, ...updates } : book,
          ),
        })),

      deleteBook: (id) =>
        set((state) => {
          const books = state.books.filter((b) => b.id !== id);
          const current =
            state.currentBookId === id ? null : state.currentBookId;
          return { books, currentBookId: current };
        }),

      markAsRead: (id) =>
        set((state) => {
          const books: Book[] = state.books.map((book) =>
            book.id === id
              ? { ...book, status: "finished", currentPage: book.totalPages }
              : book,
          );
          const next =
            books.find((b) => b.status === "reading" && b.id !== id)?.id ||
            null;

          return { books, currentBookId: next };
        }),

      startReading: (id) =>
        set((state) => ({
          books: state.books.map((b) =>
            b.id === id ? { ...b, status: "reading", currentPage: 0 } : b,
          ),
          currentBookId: id,
        })),

      rereadBook: (id) =>
        set((state) => ({
          books: state.books.map((b) =>
            b.id === id ? { ...b, status: "reading", currentPage: 0 } : b,
          ),
          currentBookId: id,
        })),

      setCurrentBook: (id) =>
        set((state) => ({
          ...state,
          currentBookId: id,
        })),

      updateTodayProgress: (progressValue) =>
        set((state) => {
          const todayProgressKey = new Date().toISOString().split("T")[0];

          const { progress } = state;

          const newProgress = {
            ...progress,
            [todayProgressKey]: progressValue,
          };

          return {
            progress: newProgress,
          };
        }),

      updateProgress: (date, progressValue) =>
        set((state) => {
          const todayProgressKey = date.toISOString().split("T")[0];

          const { progress } = state;

          const newProgress = {
            ...progress,
            [todayProgressKey]: progressValue,
          };

          return {
            progress: newProgress,
          };
        }),
    }),
    { name: "books-storage" },
  ),
);
