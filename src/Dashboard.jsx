import React from 'react';

import { Filmes } from './components/Filmes';
import { Header } from './components/Header';

export function Dashboard() {
  return (
    <>
      <Header />
      <Filmes />
    </>
  );
}