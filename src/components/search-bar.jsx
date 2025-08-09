import { Search } from "lucide-react"

const SearchBar = ({ onSearchClick }) => {
  return (
    <div
      onClick={onSearchClick}
      className="flex justify-between items-center gap-2 px-3 py-2 bg-background border border-border rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors max-w-sm"
    >
      <Search className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground flex-1 ">
        Search...
      </span>
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span>K
      </kbd>
    </div>
  )
}

export default SearchBar
