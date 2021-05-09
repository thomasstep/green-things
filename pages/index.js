import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import PlantTile from '../components/plantTile';
import PlantCard from '../components/plantCard';

const plants = [
  {
    name: 'potato',
    tileInfo: 'everyone loves potatoes',
    water: '1 inch per day',
    sun: 'full'
  },
  {
    name: 'pepper',
    tileInfo: 'ouch that\'s hot',
    water: '0.5 inches per day',
    sun: 'full'
  },
];

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
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 mx-auto text-center">
        <div className={`flex \
                         flex-wrap \
                         items-center \
                         justify-around \
                         max-w-4xl \
                         mt-6 \
                         space-x-4 \
                         sm:w-full \
                         ${activePlant === "" ? "" : "opacity-10"}`}>
          {
            plants.map((plant) => (
              <PlantTile
                plant={plant}
                showCard={showCard}
                key={`${plant.name}-tile`} />
              )
            )
          }
        </div>
        {
          plants.map((plant) => (
            <PlantCard
              plant={plant}
              visible={activePlant === plant.name}
              clearCard={clearCard}
              key={`${plant.name}-card`} />
            )
          )
        }
      </main>
    </div>
  )
}
