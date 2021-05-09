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
        <h1 className="font-bold">{plant.name}</h1>
        <h1
          className="font-bold"
          onClick={clearCard}>X</h1>
      </div>
      <h3 className="mt-6 text-2xl font-bold">Water</h3>
      <p>{`Wants ${plant.water} of water`}</p>
      <h3 className="mt-6 text-2xl font-bold">Sun</h3>
      <p>{`Wants ${plant.sun} sun`}</p>
    </div>
  );
}
