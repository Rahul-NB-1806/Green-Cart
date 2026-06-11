import aloeVera from '../image/Aloe Vera.png';
import bambooPalm from '../image/Bamboo Palm.png';
import bougainvillea from '../image/Bougainvillea.png';
import echeveria from '../image/Echeveria.png';
import lavender from '../image/Lavender.png';
import monstera from '../image/Monstera Deliciosa.png';
import orchid from '../image/Orchid.png';
import peaceLily from '../image/Peace lily.png';
import rosePlant from '../image/Rose plant.png';
import rosemary from '../image/Rosemary.png';
import spiderPlant from '../image/Spider Plant.png';
import stringOfPearls from '../image/String of pearls.png';
import tulsi from '../image/Tulsi.png';
import zzPlant from '../image/ZZ Plant.png';
import ashwagandha from '../image/ashwagandha.png';
import hibiscus from '../image/hibiscus.png';
import jadePlant from '../image/jade plant.png';
import neemPlant from '../image/neem plant.png';
import philodendronBrasil from '../image/philodendron brasil.png';
import snakePlant from '../image/snake plant.png';

const imageMap = [
  { name: 'Aloe Vera', src: aloeVera },
  { name: 'Ashwagandha', src: ashwagandha },
  { name: 'Bamboo Palm', src: bambooPalm },
  { name: 'Bougainvillea', src: bougainvillea },
  { name: 'Echeveria', src: echeveria },
  { name: 'Hibiscus', src: hibiscus },
  { name: 'Jade Plant', src: jadePlant },
  { name: 'Lavender', src: lavender },
  { name: 'Monstera Deliciosa', src: monstera },
  { name: 'Neem Plant', src: neemPlant },
  { name: 'Orchid', src: orchid },
  { name: 'Peace Lily', src: peaceLily },
  { name: 'Philodendron Brasil', src: philodendronBrasil },
  { name: 'Rose Plant', src: rosePlant },
  { name: 'Rosemary', src: rosemary },
  { name: 'Snake Plant', src: snakePlant },
  { name: 'Spider Plant', src: spiderPlant },
  { name: 'String of Pearls', src: stringOfPearls },
  { name: 'Tulsi', src: tulsi },
  { name: 'ZZ Plant', src: zzPlant },
];

export function getPlantImage(plant) {
  if (!plant?.name) return null;
  const name = plant.name.toLowerCase().trim();
  const match = imageMap.find(({ name: imgName }) => {
    const normalized = imgName.toLowerCase();
    return normalized === name || name.startsWith(normalized) || normalized.startsWith(name);
  });
  return match?.src || null;
}
