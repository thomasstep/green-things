import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import PlantTile from '../components/plantTile';
import PlantCard from '../components/plantCard';

import { PLANTS } from '../utils/constants';

// TODO esc key should set card to ""
export default function Home() {
  const [activePlant, setActivePlant] = useState('');

  function showCard(e, plantName) {
    e.preventDefault();
    setActivePlant(plantName);
  }

  function clearCard(e) {
    e.preventDefault();
    setActivePlant("");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Green Things</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <h1 className={`text-6xl font-bold mt-6 ${activePlant === "" ? "" : "opacity-10"}`}>
        Green Things
      </h1>

      {
        PLANTS.map((plant) => (
          <PlantCard
            plant={plant}
            visible={activePlant === plant.name}
            clearCard={clearCard}
            key={`${plant.name}-card`} />
          )
        )
      }

      <main className="flex flex-col items-center justify-center flex-1 text-center">
        <div className={`flex \
                         flex-wrap \
                         items-center \
                         justify-around \
                         max-w-4xl \
                         mt-6 \
                         md:space-x-4 \
                         sm:w-full \
                         ${activePlant === "" ? "" : "opacity-10"}`}>
          {
            PLANTS.map((plant) => (
              <PlantTile
                plant={plant}
                showCard={showCard}
                key={`${plant.name}-tile`} />
              )
            )
          }
        </div>
      </main>
    </div>
  )
}
