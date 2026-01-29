import { createContext, useEffect, useState } from "react"
import { api } from "../lib/api"
import { useUser } from "../hooks/useUser"

export const BooksContext = createContext()

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([])
  const { token, user } = useUser()

  /* ---------- FETCH ALL ---------- */
  async function fetchBooks() {
    if (!token) return
    const data = await api("/books", "GET", null, token)
    setBooks(data)
  }

  /* ---------- FETCH ONE ---------- */
  async function fetchBookById(id) {
    if (!token) return
    return await api(`/books/${id}`, "GET", null, token)
  }

  /* ---------- CREATE ---------- */
  async function createBook(book) {
    if (!token) return
    const newBook = await api("/books", "POST", book, token)
    setBooks(prev => [...prev, newBook])
  }

  /* ---------- DELETE ---------- */
  async function deleteBook(id) {
    if (!token) return
    await api(`/books/${id}`, "DELETE", null, token)
    setBooks(prev => prev.filter(b => b._id !== id))
  }

  /* ---------- INIT ---------- */
  useEffect(() => {
    if (user && token) {
      fetchBooks()
    } else {
      setBooks([])
    }
  }, [user, token])

  return (
    <BooksContext.Provider
      value={{
        books,
        fetchBooks,
        fetchBookById,
        createBook,
        deleteBook
      }}
    >
      {children}
    </BooksContext.Provider>
  )
}
