import React from 'react';

import { TRAITS } from '../utils/constants';

export default function PlantCard(props) {
  const { plant, visible, clearCard } = props;

  return (
    <div
      className={`flex \
                  flex-col \
                  flex-grow \
                  z-30 \
                  h-5/6 \
                  w-10/12 \
                  mx-auto \
                  p-6 \
                  border \
                  rounded-xl \
                  bg-white \
                  text-left \
                  absolute \
                  ${visible ? 'visible' : 'invisible'}`}
    >
      <div className="flex flex-row justify-between grids-cols-2 mb-6">
        <h1 className="text-2xl font-bold">{plant.name}</h1>
        <button
          className="font-bold hover:text-green-700 focus:text-green-700"
          onClick={clearCard}>
          Close
        </button>
      </div>
      <div className="divide-y-2 divide-green-700 divide-opacity-40">
        {
          Object.entries(TRAITS).filter(([trait]) => {
            if (plant[trait]) return true;
            return false;
          }).map(([trait, traitDisplay]) => {
            return (
              <div key={`${plant.name}-${trait}`}>
                <h3 className="mt-6 text-xl font-bold">{traitDisplay}</h3>
                <p className="mb-6">{plant[trait]}</p>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
