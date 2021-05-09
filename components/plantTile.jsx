export default function PlantTile(props) {
  const { plant, showCard } = props;

  return (
    <div
      className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
      onClick={(e) => showCard(e, plant.name)}
    >
      <h3 className="text-2xl font-bold">{plant.name}</h3>
      <p className="mt-4 text-xl">
        {plant.tileInfo}
      </p>
    </div>
  );
}
