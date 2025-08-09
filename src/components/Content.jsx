// components/Content.jsx
import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import axios from 'axios'

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const MOVIE_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Content = ({ activeFilter }) => {
  const [news, setNews] = useState([])
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter])

  // Fetch data when filter or page changes
  useEffect(() => {
    fetchContent()
  }, [activeFilter, currentPage])

  const fetchContent = async () => {
    setLoading(true)
    try {
      if (!activeFilter) {
        await fetchDefaultContent()
      } else if (activeFilter.type === 'news') {
        await fetchNewsByCategory(activeFilter.category)
      } else if (activeFilter.type === 'movies') {
        await fetchMoviesByCategory(activeFilter.category)
      }
    } catch (error) {
      console.error("Couldn't fetch content", error)
      setNews([])
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  const fetchDefaultContent = async () => {
    const [newsRes, movieRes] = await Promise.all([
      axios.get(`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=${NEWS_API_KEY}`),
      axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${MOVIE_API_KEY}&page=1`)
    ])

    setNews(newsRes.data.articles?.slice(0, 5) || [])
    setMovies(movieRes.data.results?.slice(0, 5) || [])
    setTotalPages(1)
    setTotalItems(10)
  }

  const fetchNewsByCategory = async (category) => {
    const endpoint = `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=10&page=${currentPage}&apiKey=${NEWS_API_KEY}`
    const response = await axios.get(endpoint)
    
    const filteredArticles = response.data.articles.filter(article => 
      article.urlToImage && 
      article.content && 
      article.content.trim().length > 0
    )

    setNews(filteredArticles)
    setMovies([]) // Clear movies when showing news
    setTotalPages(Math.ceil(response.data.totalResults / 10))
    setTotalItems(response.data.totalResults)
  }

  const fetchMoviesByCategory = async (category) => {
    let endpoint = ''
    
    switch (category) {
      case 'trending':
        endpoint = `https://api.themoviedb.org/3/trending/movie/day?api_key=${MOVIE_API_KEY}&page=${currentPage}`
        break
      case 'top_rated':
        endpoint = `https://api.themoviedb.org/3/movie/top_rated?api_key=${MOVIE_API_KEY}&page=${currentPage}`
        break
      case 'action':
        endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_API_KEY}&with_genres=28&page=${currentPage}`
        break
      case 'comedy':
        endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_API_KEY}&with_genres=35&page=${currentPage}`
        break
      case 'drama':
        endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_API_KEY}&with_genres=18&page=${currentPage}`
        break
    }

    const response = await axios.get(endpoint)
    
    setMovies(response.data.results?.slice(0, 10) || [])
    setNews([]) // Clear news when showing movies
    setTotalPages(Math.min(response.data.total_pages, 100)) // Limit to 100 pages
    setTotalItems(response.data.total_results)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPagination = () => {
    if (!activeFilter || totalPages <= 1) return null

    const pages = []
    const maxVisiblePages = 5
    const startPage = Math.max(1, currentPage - 2)
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    return (
      <div className="flex items-center justify-center gap-2 mt-8 pb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {startPage > 1 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(1)}
                className="w-10"
              >
                1
              </Button>
              {startPage > 2 && <span className="px-2">...</span>}
            </>
          )}

          {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
            <Button
              key={startPage + i}
              variant={currentPage === startPage + i ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(startPage + i)}
              className="w-10"
              disabled={loading}
            >
              {startPage + i}
            </Button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-2">...</span>}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
                className="w-10"
              >
                {totalPages}
              </Button>
            </>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-3">Loading content...</span>
      </div>
    )
  }

  return (
    <>
      <div className='grid grid-cols-1 gap-6 mt-5 md:grid-cols-2 lg:grid-cols-3'>
        {(news.length > 0 || movies.length > 0) && (
          <>
            {/* News Articles */}
            {news
                .filter(article => 
                    article.urlToImage && 
                    article.content && 
                    article.content.trim().length > 0
                )
                .map((article, index) => (
                    <a href={article.url} target='_blank' key={index} rel="noopener noreferrer">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                        <img 
                            src={article.urlToImage} 
                            alt={article.title}
                            className="w-full h-48 object-cover rounded-md mb-3"
                            onError={(e) => e.target.style.display = 'none'}
                        />
                        <CardTitle className="line-clamp-2">
                            {article.title.trim().length > 50 
                            ? article.title.trim().substring(0, 50).trim() + '...' 
                            : article.title.trim()
                            }
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                            {/* ✅ Now safe to use since we filtered out null content */}
                            {article.content.trim().length > 150 
                            ? article.content.trim().substring(0, 150).trim() + '...' 
                            : article.content.trim()
                            }
                        </CardDescription>
                        </CardHeader>
                    </Card>
                    </a>
                ))
                }


            {/* Movies */}
            {movies.map((movie) => (
              <a href={`https://www.themoviedb.org/movie/${movie.id}`} target='_blank' key={movie.id} rel="noopener noreferrer">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <img 
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                      alt={movie.title}
                      className="w-full h-48 object-cover rounded-md mb-3"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                    <CardTitle className="line-clamp-2">
                      {movie.title.trim().length > 50 
                        ? movie.title.trim().substring(0, 50).trim() + '...' 
                        : movie.title.trim()
                      }
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      {movie.overview.trim().length > 150 
                        ? movie.overview.trim().substring(0, 150).trim() + '...' 
                        : movie.overview.trim()
                      }
                    </CardDescription>
                  </CardHeader>
                </Card>
              </a>
            ))}
          </>
        )}

        {(news.length === 0 && movies.length === 0) && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No content available</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {renderPagination()}

      {/* Page Info */}
      {activeFilter && totalPages > 1 && (
        <div className="text-center text-sm text-muted-foreground mt-4">
          Page {currentPage} of {totalPages} • {totalItems} total items
        </div>
      )}
    </>
  )
}

export default Content
