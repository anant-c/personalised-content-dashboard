import { useState, useEffect } from "react"
import { ModeToggle } from "../components/mode-toggle.jsx"
import { AppSidebar } from "../components/app-sidebar.jsx"
import { SidebarInset, SidebarTrigger } from "../components/ui/sidebar"
import SearchBar from "../components/search-bar.jsx"
import Content from "../components/Content.jsx"

const Dashboard = ({ openSearch }) => {
  const [activeFilter, setActiveFilter] = useState(null)
  // State for favorites, loaded from localStorage on initial render
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('contentFavorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Could not parse favorites from localStorage", error);
      return [];
    }
  });

  // Save favorites to localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem('contentFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleCategoryClick = (filter) => {
    setActiveFilter(filter)
  }

  // Function to add or remove an item from favorites
  const toggleFavorite = (item, type) => {
    // Use URL for news as a unique ID, and ID for movies
    const itemId = type === 'news' ? item.url : item.id;
    const existingIndex = favorites.findIndex(fav => fav.id === itemId);

    if (existingIndex > -1) {
      // Item exists, so we remove it
      setFavorites(currentFavorites => currentFavorites.filter(fav => fav.id !== itemId));
    } else {
      // Item doesn't exist, so we add it
      const newFavorite = { id: itemId, type, data: item };
      setFavorites(currentFavorites => [...currentFavorites, newFavorite]);
    }
  };

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
                {activeFilter.type === 'favorites' 
                  ? 'Your Saved Items' 
                  : `Showing ${activeFilter.type} • ${activeFilter.title}`
                }
              </div>
            )}
          </div>
          <Content 
            activeFilter={activeFilter} 
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </div>
      </SidebarInset>
    </div>
  )
}

export default Dashboard