import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "../hooks/use-debounce.js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog.jsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command.jsx";
import { Button } from "./ui/button.jsx";
import { Badge } from "./ui/badge.jsx";
import { Search, Film, Newspaper, ExternalLink } from "lucide-react";

const SearchDialog = ({ open, onOpenChange }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ news: [], movies: [] });
  const [loading, setLoading] = useState(false);
  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const MOVIE_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const debouncedQuery = useDebounce(query, 300);

  const searchAPIs = useCallback(async (searchTerm) => {
    if (!searchTerm.trim()) {
      setResults({ news: [], movies: [] });
      return;
    }

    setLoading(true);
    try {
      const [newsResponse, tmdbResponse] = await Promise.all([
        fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(searchTerm)}&pageSize=3&sortBy=popularity&apiKey=${NEWS_API_KEY}`),
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${encodeURIComponent(searchTerm)}&page=1`)
      ]);

      const newsData = await newsResponse.json();
      const tmdbData = await tmdbResponse.json();

      setResults({
        news: newsData.articles?.slice(0, 3) || [],
        movies: tmdbData.results?.slice(0, 3) || [],
      });
    } catch (error) {
      console.error("Search failed:", error);
      setResults({ news: [], movies: [] });
    } finally {
      setLoading(false);
    }
  }, [NEWS_API_KEY, MOVIE_API_KEY]);

  useEffect(() => {
    searchAPIs(debouncedQuery);
  }, [debouncedQuery, searchAPIs]);

  const handleResultClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
    onOpenChange(false);
  };

  const handleOpenChange = (isOpen) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      setQuery("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden p-0">
        <DialogHeader className="hidden">
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Results
          </DialogTitle>
        </DialogHeader>

        <Command shouldFilter={false} className="rounded-none border-none">
          <CommandInput
            placeholder="Search for movies, shows, or news..."
            value={query}
            onValueChange={setQuery}
            className="border-none focus:ring-0"
          />

          <CommandList className="max-h-[500px] overflow-y-auto px-6 pb-6">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                <span className="ml-2">Searching...</span>
              </div>
            )}

            {!loading && !debouncedQuery.trim() && (
              <div className="text-center py-8 text-gray-500 text-sm">
                Start typing to search for movies and news...
              </div>
            )}

            {!loading && debouncedQuery.trim() && results.news.length === 0 && results.movies.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}

            {!loading && (results.news.length > 0 || results.movies.length > 0) && (
              <>
                {/* News Results */}
                {results.news.length > 0 && (
                  <CommandGroup>
                    <div className="flex items-center gap-2 mb-3">
                      <Newspaper className="h-4 w-4" />
                      <span className="font-semibold text-sm">News</span>
                    </div>
                    {results.news.map((article, index) => (
                      <CommandItem
                        key={index}
                        onSelect={() => handleResultClick(article.url)}
                        className="flex items-start gap-3 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mb-2 border"
                        value={`news-${article.title}`}
                      >
                        <div className="flex-shrink-0">
                          {article.urlToImage ? (
                            <img
                              src={article.urlToImage}
                              alt={article.title}
                              className="w-16 h-16 object-cover rounded-md"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                              <Newspaper className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center" style={{display: 'none'}}>
                            <Newspaper className="h-6 w-6 text-gray-400" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm mb-1" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {article.title}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {article.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {article.source?.name}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(article.publishedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      </CommandItem>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => handleResultClick(`https://news.google.com/search?q=${encodeURIComponent(query)}`)}
                    >
                      Show more news results
                    </Button>
                  </CommandGroup>
                )}

                {/* Movies Results */}
                {results.movies.length > 0 && (
                  <CommandGroup>
                    <div className="flex items-center gap-2 mb-3 mt-6">
                      <Film className="h-4 w-4" />
                      <span className="font-semibold text-sm">Movies</span>
                    </div>
                    {results.movies.map((movie) => (
                      <CommandItem
                        key={movie.id}
                        onSelect={() => handleResultClick(`https://www.themoviedb.org/movie/${movie.id}`)}
                        className="flex items-start gap-3 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mb-2 border"
                        value={`movie-${movie.title}`}
                      >
                        <div className="flex-shrink-0">
                          {movie.poster_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                              alt={movie.title}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                              <Film className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm mb-1" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {movie.title}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {movie.overview}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">★</span>
                              <span className="text-xs text-gray-500">
                                {movie.vote_average?.toFixed(1) || 'N/A'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      </CommandItem>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => handleResultClick(`https://www.themoviedb.org/search?query=${encodeURIComponent(query)}`)}
                    >
                      Show more movie results
                    </Button>
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
