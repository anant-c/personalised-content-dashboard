import { useState, useEffect } from "react"
import SearchDialog from "./search-dialog"

const SearchProvider = ({ children }) => {
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const openSearch = () => {
    setSearchOpen(true)
  }

  return (
    <>
      {typeof children === 'function' ? children({ openSearch }) : children}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}

export default SearchProvider
