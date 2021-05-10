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
      <div className="flex flex-row justify-between grids-cols-2">
        <h1 className="text-2xl font-bold">{plant.name}</h1>
        <button
          className="font-bold"
          onClick={clearCard}>
          Close
        </button>
      </div>
      {
        Object.entries(TRAITS).filter(([trait]) => {
          if (plant[trait]) return true;
          return false;
        }).map(([trait, traitDisplay]) => {
          return (
            <React.Fragment key={`${plant.name}-${trait}`}>
              <h3 className="mt-6 text-xl">{traitDisplay}</h3>
              <p>{plant[trait]}</p>
            </React.Fragment>
          );
        })
      }
    </div>
  );
}
