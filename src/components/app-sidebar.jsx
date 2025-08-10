import { TvMinimalPlay,CpuIcon,FlameIcon, BikeIcon, HospitalIcon,SparkleIcon,LaughIcon, SwordIcon, Star ,DramaIcon,BriefcaseBusiness } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "./ui/sidebar"

const newsItems = [
  { title: "Technology", icon: CpuIcon, category: "technology" },
  { title: "Sports", icon: BikeIcon, category: "sports" },
  { title: "Entertainment", icon: TvMinimalPlay, category: "entertainment" },
  { title: "Health", icon: HospitalIcon, category: "health" },
  { title: "Business", icon: BriefcaseBusiness, category: "business" },
]

const movieItems = [
  { title: "Trending", icon: FlameIcon, category: "trending" },
  { title: "Top Rated", icon: SparkleIcon, category: "top_rated" },
  { title: "Action", icon: SwordIcon, category: "action" },
  { title: "Comedy", icon: LaughIcon, category: "comedy" },
  { title: "Drama", icon: DramaIcon, category: "drama" },
]

export function AppSidebar({ onCategoryClick, activeFilter }) {
  const handleItemClick = (type, category, title) => {
    onCategoryClick({ type, category, title })
  }

  const handleClearFilter = () => {
    onCategoryClick(null)
  }

  return (
    <Sidebar>
      <SidebarHeader className="text-center font-bold">
        Personalized Content Dashboard
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between">
            <SidebarGroupLabel>News</SidebarGroupLabel>
            {activeFilter && (
              <button 
                onClick={handleClearFilter}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Show All
              </button>
            )}
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {newsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={activeFilter?.type === 'news' && activeFilter?.category === item.category}
                    onClick={() => handleItemClick('news', item.category, item.title)}
                    className="cursor-pointer"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupLabel>Movies</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {movieItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={activeFilter?.type === 'movies' && activeFilter?.category === item.category}
                    onClick={() => handleItemClick('movies', item.category, item.title)}
                    className="cursor-pointer"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeFilter?.type === 'favorites'}
              onClick={() => handleItemClick('favorites', 'all', 'Your Favourites')}
              className="cursor-pointer"
            >
              <Star/>
              <span className="text-lg font-semibold">Favourites</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}