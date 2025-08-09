import {useEffect, useState} from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import axios from 'axios'

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const MOVIE_API_KEY = import.meta.env.VITE_TMDB_API_KEY;



const Content = () => {
    const [news, setNews] = useState([])
    const [movies, setMovies] = useState([])

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const newsRes = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`)
                const movieRes = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${MOVIE_API_KEY}`)

                const newsData = newsRes.data
                const movieData = movieRes.data

                setNews(newsData.articles?.slice(0,10) || []);
                setMovies(movieData.results?.slice(0,10) || [])
            } catch (error) {
                console.error("Couldn't fetch trending news and movies", error)
                setMovies([])
                setNews([])
            }
        }

        fetchData()

    },[])


  return (
    <div className='grid grid-cols-1 gap-6 mt-5 md:grid-cols-2 lg:grid-cols-3'>

        {(news.length > 0 || movies.length > 0) && (
            <>
                {news.map((article, index)=>(
                    <a href={article.url} target='_blank'>
                    <Card key={index}>
                        <CardHeader>
                                {article.urlToImage && (
                                    <img src={article.urlToImage} alt={article.title} />
                                )}
                            <CardTitle>
                                {article.title}
                            </CardTitle>
                            <CardDescription>
                                {article.description}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    </a>
                ))}
            </>
        )}
        {/* <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card> */}
        
    </div>
  )
}

export default Content