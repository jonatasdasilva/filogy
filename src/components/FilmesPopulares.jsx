import React from 'react';
import { useState, useEffect } from 'react';

import { Poster } from './Poster';
import '../styles/FilmesPopulares.css';
import { configs } from '../configs/configs';

import { ScrollView } from "@progress/kendo-react-scrollview";

export function FilmesPopulares() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${configs.APIKey}&language=pt-BR&page=1&vote_average.gte=7.5`)
    .then(response => response.json())
    .then( result => setPopular(result.results));
  }, []);

  return (
    <>
      <section className='filmes-populares'>
      </section>
      <ScrollView
        style={{
          border: 0
        }}
        arrows={false}
        endless={true}
        pageable={false}
        className='populares'
      >
        {popular.map((film, index) => {
          return (
            <Poster key={index} index={index} poster_path={film.poster_path} vote_average={film.vote_average} title={film.title} backdrop_path={film.backdrop_path} />
          );
        })}
      </ScrollView>
    </>
  );
}