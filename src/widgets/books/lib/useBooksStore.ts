import { create } from "zustand"
import { persist } from "zustand/middleware"

export type BookStatus = "want" | "reading" | "finished"

export type Book = {
  id: number
  title: string
  author: string
  totalPages: number
  currentPage: number
  status: BookStatus
}

type BooksState = {
  books: Book[]
  currentBookId: number | null
  addBook: (book: Omit<Book, "id" | "currentPage">) => void
  updateBook: (id: number, updates: Partial<Book>) => void
  deleteBook: (id: number) => void
  markAsRead: (id: number) => void
  startReading: (id: number) => void
  rereadBook: (id: number) => void
  setCurrentBook: (id: number) => void
}

export const useBooksStore = create<BooksState>()(
  persist(
    (set) => ({
      books: [],
      currentBookId: null,

      addBook: (book) =>
        set((state) => {
          const id = Date.now()
          const newBook = { ...book, id }
          return {
            books: [...state.books, newBook],
            currentBookId: book.status === "reading" ? id : state.currentBookId,
          }
        }),

      updateBook: (id, updates) =>
        set((state) => ({
          books: state.books.map((book) =>
            book.id === id ? { ...book, ...updates } : book
          ),
        })),

      deleteBook: (id) =>
        set((state) => {
          const books = state.books.filter((b) => b.id !== id)
          const current = state.currentBookId === id ? null : state.currentBookId
          return { books, currentBookId: current }
        }),

      markAsRead: (id) =>
        set((state) => {
          const books = state.books.map((b) =>
            b.id === id ? { ...b, status: "finished", currentPage: b.totalPages } : b
          )
          const next = books.find((b) => b.status === "reading" && b.id !== id)?.id || null
          return { books, currentBookId: next }
        }),

      startReading: (id) =>
        set((state) => ({
          books: state.books.map((b) =>
            b.id === id ? { ...b, status: "reading", currentPage: 0 } : b
          ),
          currentBookId: id,
        })),

      rereadBook: (id) =>
        set((state) => ({
          books: state.books.map((b) =>
            b.id === id ? { ...b, status: "reading", currentPage: 0 } : b
          ),
          currentBookId: id,
        })),

      setCurrentBook: (id) =>
        set((state) => ({
          ...state,
          currentBookId: id,
        })),
    }),
    { name: "books-storage" }
  )
)
