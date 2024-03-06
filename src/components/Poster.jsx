import React from 'react';
//import { useState, useEffect } from 'react';

import '../styles/Poster.css';
import { configs } from '../configs/configs';

export function Poster ({ index, poster_path, vote_average, title, backdrop_path }) {
  const image_path = `${configs.url_image}${poster_path}`;
  const background_path = `${configs.url_image}${backdrop_path}`;
  let rating = parseFloat(vote_average.toFixed(1));

  return (
    <section className='poster' key={index}>
      <div className="background">
        <img src={background_path} alt="Imagem do filme" className='image-background' />
      </div>
      <div className='filme'>
        <h2>{index+1}</h2>
        <div className='information'>
          <img src={image_path} />
          <span>{rating}</span>
          <h1>{title}</h1>
        </div>
      </div>
    </section>
  );
}