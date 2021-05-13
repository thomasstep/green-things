export default function PlantTile(props) {
  const { plant, showCard } = props;

  return (
    <div
      className="p-6 mt-6 text-left border w-10/12 md:w-96 rounded-xl cursor-pointer hover:text-green-700 focus:text-green-700"
      onClick={(e) => showCard(e, plant.name)}
    >
      <h3 className="text-xl font-bold">{plant.name}</h3>
      <p className="mt-4 text-l">
        {plant.tileInfo}
      </p>
    </div>
  );
}
