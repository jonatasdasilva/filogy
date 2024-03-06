import React from 'react';
import { useState, useEffect } from 'react';

import { filterBy } from "@progress/kendo-data-query";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";

import '../styles/Filmes.css';
import { configs } from '../configs/configs';
import { FilmesPopulares } from './FilmesPopulares';

const initialFilter = {
  logic: "and",
  filters: [
    {
      field: "rating",
      operator: "gt",
      value: 0.1,
    },
  ],
};

export function Filmes() {
  const [catalog, setCatalog] = useState([]);
  const [filter, setFilter] = React.useState(initialFilter);

  useEffect(() => {
    const fetchData = async () => {
      let filmes = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1&region=UTF-8&api_key=${configs.APIKey}`);
      filmes = await filmes.json(); filmes = filmes.results;
    
      let genero = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&region=UTF-8&api_key=${configs.APIKey}`);
      console.log(genero)
      genero = await genero.json(); genero = genero.genres;
      console.log('filmes: ', filmes)
      console.log('Genero: ', genero)
      const all_films = filmes.map(film => {
        let genresNames = film.genre_ids.map(genreID => {
          const gen = genero.find(instance_genre => {
            if (instance_genre.id === genreID)
              return instance_genre;
          });
          return gen.name
        });
        let date = film.release_date.split('-');
        let year = date[0], month = date[1], day = date[2];
        let formattedDate = `${day}/${month}/${year}`;
        let instance = {
          "id": film.id,
          "cover": `${configs.url_image}${film.poster_path}`,
          "title": film.title,
          "genres_ids": film.genre_ids,
          "genres": genresNames,
          "rating": film.vote_average.toFixed(1),
          "create_date": formattedDate,
          "release_date": film.release_date,
          "popularity": film.popularity,
          "overview": film.overview
        }
        return instance;
      });
      setCatalog(all_films);

    }

    fetchData();
  }, []);

  const coverColumn = (value) => {
    return (
      <td>
        <img src={value.dataItem.cover} style={{ width: 110, height: 152 }}  alt={`${value.dataItem.title}`} />
      </td>
    )
  }
  
  return (
    <>
      <FilmesPopulares />
      <Grid
        data={filterBy(catalog, filter)}
        sortable={true}
        filter={filter}
        filterable={true}
        onFilterChange={(e) => setFilter(e.filter)}
      >
        <Column field='cover' title="Capa" cell={coverColumn} filterable={false} />
        <Column field="title" title="Título" filter={'text'} />
        <Column field='create_date' title="Data de Criação" filter={'text'}  />
        <Column field="genres" title="Gêneros" filterable={false} />
        <Column field="rating" title="Classificação" filter={'numeric'} />
        <Column field="overview" title="Sinopse" width="600px" filter={'text'} />
      </Grid>
    </>
  );
}