import React from 'react';

import { TRAITS } from '../utils/constants';

export default function PlantCard(props) {
  const { plant, visible, clearCard } = props;

  return (
    <div
      className={`overflow-auto \
                  z-30 \
                  h-5/6 \
                  w-10/12 \
                  mx-auto \
                  top-20 \
                  p-6 \
                  border \
                  rounded-xl \
                  bg-white \
                  text-left \
                  fixed \
                  ${visible ? 'visible' : 'invisible'}`}
    >
      <div className="flex flex-row justify-between mb-6">
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
            if (typeof plant[trait] === 'string' && plant[trait].length > 0) {
              return (
                <div key={`${plant.name}-${trait}`}>
                  <h3 className="mt-6 mb-4 text-xl font-bold">{traitDisplay}</h3>
                      <p className="mb-6">{plant[trait]}</p>
                </div>
              );
            }

            if (Array.isArray(plant[trait]) && plant[trait].length > 0) {
              return (
                <div key={`${plant.name}-${trait}`}>
                  <h3 className="mt-6 mb-4 text-xl font-bold">{traitDisplay}</h3>
                    <ul className="mb-6 list-none">
                      {
                        plant[trait].map((traitEntry) => {
                          return (
                            <li key={`${plant.name}-${trait}-${traitEntry}`}>{traitEntry}</li>
                          );
                        })
                      }
                    </ul>
                </div>
              );
            }
          })
        }
      </div>
    </div>
  );
}
