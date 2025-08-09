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
  {
    title: "Technology",
    url: "#",
    icon: CpuIcon,
  },
  {
    title: "Sports",
    url: "#",
    icon: BikeIcon,
  },
  {
    title: "Entertainment",
    url: "#",
    icon: TvMinimalPlay,
  },
  {
    title: "Health",
    url: "#",
    icon: HospitalIcon,
  },
  {
    title: "Bussiness",
    url: "#",
    icon: BriefcaseBusiness,
  },
]

const movieItems = [
  {
    title: "Trending",
    url: "#",
    icon: FlameIcon,
  },
  {
    title: "Top Rated",
    url: "#",
    icon: SparkleIcon,
  },
  {
    title: "Action",
    url: "#",
    icon: SwordIcon,
  },
  {
    title: "Comedy",
    url: "#",
    icon: LaughIcon,
  },
  {
    title: "Drama",
    url: "#",
    icon: DramaIcon,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="text-center font-bold">
        Personalized Content Dashboard
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>News</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {newsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
            <a href="#" className="flex justify-start items-center gap-2 ml-1">
              <Star/>
              <span className="text-lg font-semibold">Favourites</span>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}