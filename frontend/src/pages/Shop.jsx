import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PlantCard from '../components/PlantCard';
import { getPlants } from '../services/api';

const fallbackPlants = [
  { _id: "1", name: "Snake Plant", price: 499, category: "indoor", image: "", description: "Hardy, air-purifying plant that thrives on neglect.", rating: { average: 4.5, count: 128 }, stock: 15 },
  { _id: "2", name: "Aloe Vera", price: 349, category: "succulent", image: "", description: "Healing succulent with medicinal properties.", rating: { average: 4.7, count: 95 }, stock: 8 },
  { _id: "3", name: "Monstera Deliciosa", price: 899, category: "indoor", image: "", description: "Iconic split-leaf tropical plant.", rating: { average: 4.8, count: 67 }, stock: 5 },
  { _id: "4", name: "Lavender", price: 299, category: "outdoor", image: "", description: "Fragrant purple blooms that attract pollinators.", rating: { average: 4.3, count: 82 }, stock: 20 },
  { _id: "5", name: "Tulsi (Holy Basil)", price: 199, category: "medicinal", image: "", description: "Sacred Indian herb with immune-boosting properties.", rating: { average: 4.9, count: 156 }, stock: 25 },
  { _id: "6", name: "Peace Lily", price: 599, category: "flowering", image: "", description: "Elegant white blooms. One of the best air-purifying plants.", rating: { average: 4.6, count: 73 }, stock: 10 },
  { _id: "7", name: "ZZ Plant", price: 549, category: "indoor", image: "", description: "Nearly indestructible plant that thrives on neglect.", rating: { average: 4.6, count: 89 }, stock: 20 },
  { _id: "8", name: "Jade Plant", price: 449, category: "succulent", image: "", description: "Lucky money plant. Symbol of prosperity.", rating: { average: 4.4, count: 54 }, stock: 12 },
  { _id: "9", name: "Spider Plant", price: 349, category: "indoor", image: "", description: "Classic trailing plant that produces baby spiders.", rating: { average: 4.4, count: 72 }, stock: 30 },
  { _id: "10", name: "Hibiscus", price: 449, category: "outdoor", image: "", description: "Tropical beauty with large, showy flowers.", rating: { average: 4.5, count: 57 }, stock: 16 },
  { _id: "11", name: "Echeveria", price: 249, category: "succulent", image: "", description: "Rosette-shaped succulent with plump pastel leaves.", rating: { average: 4.3, count: 41 }, stock: 35 },
  { _id: "12", name: "Ashwagandha", price: 349, category: "medicinal", image: "", description: "Adaptogenic herb for stress reduction.", rating: { average: 4.5, count: 47 }, stock: 20 },
  { _id: "13", name: "Rose Plant", price: 399, category: "flowering", image: "", description: "Classic garden rose with fragrant blooms.", rating: { average: 4.6, count: 93 }, stock: 24 },
  { _id: "14", name: "Bougainvillea", price: 549, category: "outdoor", image: "", description: "Drought-tolerant climber with vibrant bracts.", rating: { average: 4.4, count: 63 }, stock: 22 },
  { _id: "15", name: "Bamboo Palm", price: 749, category: "indoor", image: "", description: "Elegant indoor palm that adds a tropical vibe.", rating: { average: 4.3, count: 41 }, stock: 12 },
  { _id: "16", name: "Philodendron Brasil", price: 449, category: "indoor", image: "", description: "Heart-shaped leaves with stunning variegation.", rating: { average: 4.5, count: 48 }, stock: 18 },
  { _id: "17", name: "Rosemary", price: 249, category: "medicinal", image: "", description: "Aromatic culinary herb that improves memory.", rating: { average: 4.2, count: 48 }, stock: 22 },
  { _id: "18", name: "Orchid", price: 999, category: "flowering", image: "", description: "Exotic moth orchid with long-lasting blooms.", rating: { average: 4.7, count: 58 }, stock: 7 },
  { _id: "19", name: "Neem Plant", price: 399, category: "medicinal", image: "", description: "Natural antibacterial with mosquito-repelling properties.", rating: { average: 4.6, count: 63 }, stock: 15 },
  { _id: "20", name: "String of Pearls", price: 399, category: "succulent", image: "", description: "Unique trailing succulent with bead-like leaves.", rating: { average: 4.7, count: 56 }, stock: 14 },
];

function filterPlants(list, category) {
  if (category === 'all') return list;
  return list.filter(p => p.category === category);
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(searchParams.get('category') || 'all');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const params = filter !== 'all' ? { category: filter } : {};
        const { data } = await getPlants(params);
        setPlants(data);
      } catch {
        setPlants(filterPlants(fallbackPlants, filter));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [filter]);

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'indoor', label: 'Indoor' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'succulent', label: 'Succulents' },
    { value: 'medicinal', label: 'Medicinal' },
    { value: 'flowering', label: 'Flowering' },
  ];

  return (
    <div className="min-h-screen bg-deep-forest font-body pt-16">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl text-ivory">Our Collection</h1>
          <p className="text-stone mt-4 max-w-xl mx-auto">
            Explore our full range of premium plants for every space and lifestyle
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => { setFilter(cat.value); setSearchParams(cat.value === 'all' ? {} : { category: cat.value }); }}
              className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                filter === cat.value
                  ? 'bg-emerald text-deep-forest font-medium'
                  : 'bg-surface text-stone hover:text-ivory border border-surface-light'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-surface rounded-2xl border border-surface-light p-5">
                <div className="h-48 bg-surface-lighter rounded-xl animate-shimmer" />
                <div className="h-4 w-3/4 bg-surface-lighter rounded mt-4 animate-shimmer" />
                <div className="h-4 w-1/2 bg-surface-lighter rounded mt-2 animate-shimmer" />
              </div>
            ))}
          </div>
        ) : plants.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-stone text-lg">No plants found</p>
            <p className="text-stone-dark text-sm mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plants.map((plant, i) => (
              <div
                key={plant._id}
                className="animate-fade-up opacity-0"
                style={{ animationDelay: `${(i % 4) * 0.1}s` }}
              >
                <PlantCard plant={plant} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
