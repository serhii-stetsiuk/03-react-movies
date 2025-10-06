import axios from "axios";

import { type Movie } from "../types/movie";


interface ParamsInterface{
	query: string;
	include_adult: boolean;
	language: string;
	page: string;
}
interface getMovieResp{
	results: Movie[];
}
axios.defaults.params= {
	orientation: 'landscape',
}

export default async function fetchMovies(newInput: string):Promise<Movie[]>{
	 
    const myKey: string = import.meta.env.VITE_TMDB_TOKEN;
    const res = await axios.get<getMovieResp>('https://api.themoviedb.org/3/search/movie', {
      params: {
        query: newInput,
        include_adult: false,
        language: 'en-US',
        page: '1',
      } as ParamsInterface,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${myKey}`,
      },
	 });
	
	// console.log(res.data.results);
	 
	return res.data.results;
  };
