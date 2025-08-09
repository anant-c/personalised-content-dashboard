// pages/Dashboard.jsx
import { useState } from "react"
import { ModeToggle } from "../components/mode-toggle.jsx"
import { AppSidebar } from "../components/app-sidebar.jsx"
import { SidebarInset, SidebarTrigger } from "../components/ui/sidebar"
import SearchBar from "../components/search-bar.jsx"
import Content from "../components/Content.jsx"

const Dashboard = ({ openSearch }) => {
  const [activeFilter, setActiveFilter] = useState(null)

  const handleCategoryClick = (filter) => {
    setActiveFilter(filter)
  }

  return (
    <div className='min-h-screen flex w-full'>
      <AppSidebar 
        onCategoryClick={handleCategoryClick}
        activeFilter={activeFilter}
      />
      <SidebarInset className="flex-1">
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          
          <div className="flex-1 max-w-md mx-4">
            <SearchBar onSearchClick={openSearch} />
          </div>
          
          <ModeToggle />
        </header>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">
              {activeFilter ? activeFilter.title : 'News & Movies'}
            </h1>
            {activeFilter && (
              <div className="text-sm text-muted-foreground">
                Showing {activeFilter.type} • {activeFilter.title}
              </div>
            )}
          </div>
          <Content activeFilter={activeFilter} />
        </div>
      </SidebarInset>
    </div>
  )
}

export default Dashboard
