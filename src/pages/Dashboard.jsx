// pages/Dashboard.jsx
import { ModeToggle } from "../components/mode-toggle.jsx"
import { AppSidebar } from "../components/app-sidebar.jsx"
import { SidebarInset, SidebarTrigger } from "../components/ui/sidebar"
import SearchBar from "../components/search-bar.jsx"
import Content from "../components/Content.jsx"

const Dashboard = ({ openSearch }) => {
  return (
    <div className='min-h-screen flex w-full'>
      <AppSidebar/>
      <SidebarInset className="flex-1">
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          
          {/* Search bar between sidebar trigger and theme toggle */}
          <div className="flex-1 max-w-md mx-4">
            <SearchBar onSearchClick={openSearch} />
          </div>
          
          <ModeToggle />
        </header>
        <div className="p-4">
          {/* Your main dashboard content goes here */} 
          <h1 className="text-2xl font-bold">News & Movies</h1>
            <Content></Content>
        </div>
      </SidebarInset>
    </div>
  )
}

export default Dashboard
