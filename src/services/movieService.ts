import axios from "axios";

import { type Movie } from "../types/movie";



interface getMovieResp{
	results: Movie[];
}


export default async function fetchMovies(query: string):Promise<Movie[]>{
	 
    const myKey: string = import.meta.env.VITE_TMDB_TOKEN;
    const res = await axios.get<getMovieResp>('https://api.themoviedb.org/3/search/movie', {
      params: {
        query: query,
        include_adult: false,
        language: 'en-US',
        page: '1',
      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${myKey}`,
      },
	 });
	
 
	return res.data.results;
  };
