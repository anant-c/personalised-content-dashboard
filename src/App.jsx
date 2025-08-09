// App.jsx
import {Routes, Route} from "react-router-dom"
import {lazy, Suspense} from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import SearchProvider from "./components/search-provider"


const Dashboard = lazy(()=>import("./pages/Dashboard"))

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <SearchProvider>
          {({ openSearch }) => (
            <Routes>
              <Route 
                path="/" 
                element={
                  <Suspense> 
                    <Dashboard openSearch={openSearch} /> 
                  </Suspense>
                }
              />
            </Routes>
          )}
        </SearchProvider>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
