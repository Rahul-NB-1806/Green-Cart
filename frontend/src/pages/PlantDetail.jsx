import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPlantById } from '../services/api';
import { useCart } from '../context/CartContext';

const fallbackPlants = [
  { _id: "1", name: "Snake Plant", price: 499, category: "indoor", image: "", description: "Hardy, air-purifying plant that thrives on neglect. Perfect for beginners and bedrooms.", isMedicinal: false, stock: 25, featured: true, rating: { average: 4.5, count: 128 }, careGuide: { wateringSchedule: 'Every 2-3 weeks', sunlightRequirement: 'Low to bright indirect light', soilType: 'Well-draining succulent mix', soilChangeFrequency: 'Every 2 years', temperature: '15-29°C', humidity: '30-50%' } },
  { _id: "2", name: "Aloe Vera", price: 349, category: "succulent", image: "", description: "A healing succulent with medicinal properties. The gel inside its leaves soothes burns and skin irritations.", isMedicinal: true, stock: 20, featured: true, rating: { average: 4.7, count: 95 }, careGuide: { wateringSchedule: 'Every 2-3 weeks', sunlightRequirement: 'Bright indirect light', soilType: 'Well-draining cactus mix', soilChangeFrequency: 'Every 2 years', temperature: '18-27°C', humidity: 'Low' }, medicalProperties: { uses: ['Burn relief', 'Skin hydration', 'Digestive aid'], benefits: 'Soothes sunburns, moisturizes skin, and aids digestion when consumed as juice.', partsUsed: 'Leaf gel', dosageInfo: 'Apply gel directly to affected area. For juice: 1 tablespoon daily.', precautions: 'Not recommended for pregnant women internally.' } },
  { _id: "3", name: "Monstera Deliciosa", price: 899, category: "indoor", image: "", description: "Iconic split-leaf tropical plant that makes a bold statement. Known for its large, fenestrated leaves.", isMedicinal: false, stock: 10, featured: true, rating: { average: 4.8, count: 67 }, careGuide: { wateringSchedule: 'Every 1-2 weeks', sunlightRequirement: 'Bright indirect light', soilType: 'Rich, well-draining potting mix', soilChangeFrequency: 'Every 12-18 months', temperature: '18-27°C', humidity: '60-80%' } },
  { _id: "4", name: "Lavender", price: 299, category: "outdoor", image: "", description: "Fragrant purple blooms that attract pollinators and calm the mind.", isMedicinal: true, stock: 30, featured: true, rating: { average: 4.3, count: 82 }, careGuide: { wateringSchedule: 'Every 1-2 weeks', sunlightRequirement: 'Full sun (6+ hours)', soilType: 'Well-draining alkaline soil', soilChangeFrequency: 'Every 2-3 years when repotting', temperature: '15-30°C', humidity: 'Low' }, medicalProperties: { uses: ['Anxiety relief', 'Sleep aid', 'Antiseptic'], benefits: 'Reduces anxiety, promotes restful sleep, and has natural antiseptic properties.', partsUsed: 'Flowers, essential oil', dosageInfo: 'Aromatherapy: 3-5 drops in diffuser. Tea: 1 tsp dried flowers steeped 5 min.', precautions: 'May cause skin irritation in concentrated form.' } },
  { _id: "5", name: "Tulsi (Holy Basil)", price: 199, category: "medicinal", image: "", description: "Sacred Indian herb with powerful adaptogenic and immune-boosting properties.", isMedicinal: true, stock: 35, featured: true, rating: { average: 4.9, count: 156 }, careGuide: { wateringSchedule: 'Every 2-3 days', sunlightRequirement: 'Full sun to partial shade', soilType: 'Well-draining loamy soil', soilChangeFrequency: 'Every 12 months', temperature: '20-38°C', humidity: '40-60%' }, medicalProperties: { uses: ['Immunity boost', 'Stress relief', 'Respiratory health', 'Anti-inflammatory'], benefits: 'Strengthens immunity, reduces stress, supports respiratory health, and reduces inflammation.', partsUsed: 'Leaves, seeds', dosageInfo: 'Tea: 5-7 leaves steeped in hot water for 5 min. Chew 2-3 fresh leaves daily.', precautions: 'May lower blood sugar. Consult doctor if on diabetes medication.' } },
  { _id: "6", name: "Peace Lily", price: 599, category: "flowering", image: "", description: "Elegant white blooms and glossy green leaves. One of the best air-purifying plants for indoor spaces.", isMedicinal: false, stock: 15, featured: true, rating: { average: 4.6, count: 73 }, careGuide: { wateringSchedule: 'Weekly', sunlightRequirement: 'Low to medium indirect light', soilType: 'Moist, well-draining potting mix', soilChangeFrequency: 'Every 12-18 months', temperature: '18-26°C', humidity: '50-70%' } },
];

const categoryColors = {
  indoor: 'from-emerald-900/50 to-teal-900/50',
  outdoor: 'from-amber-900/50 to-orange-900/50',
  succulent: 'from-green-900/50 to-emerald-900/50',
  medicinal: 'from-purple-900/50 to-emerald-900/50',
  flowering: 'from-pink-900/50 to-rose-900/50',
};

export default function PlantDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data } = await getPlantById(id);
        setPlant(data);
      } catch {
        const fallback = fallbackPlants.find(p => p._id === id);
        if (fallback) setPlant(fallback);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleAddToCart = () => {
    addItem(plant._id, quantity, plant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-deep-forest font-body pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="animate-shimmer h-8 w-48 bg-surface-lighter rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div className="aspect-[4/3] bg-surface-lighter rounded-3xl animate-shimmer" />
            <div className="space-y-4">
              <div className="h-6 w-3/4 bg-surface-lighter rounded animate-shimmer" />
              <div className="h-4 w-1/4 bg-surface-lighter rounded animate-shimmer" />
              <div className="h-20 bg-surface-lighter rounded animate-shimmer" />
              <div className="h-12 w-1/3 bg-surface-lighter rounded animate-shimmer" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-screen bg-deep-forest font-body pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-clay/10 flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-clay" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.37 0 2.434-.94 2.434-2.1 0-.55-.26-1.07-.72-1.46L13.354 4.54c-.61-.6-1.46-.9-2.354-.9s-1.744.3-2.354.9L2.386 15.34c-.46.39-.72.91-.72 1.46 0 1.16 1.064 2.1 2.434 2.1z" />
            </svg>
          </div>
          <h1 className="font-display text-3xl text-ivory">Plant Not Found</h1>
          <p className="text-stone mt-3">The plant you're looking for doesn't exist or has been removed.</p>
          <Link to="/plants" className="inline-block mt-8 bg-emerald hover:bg-emerald-dark text-deep-forest font-medium px-6 py-3 rounded-xl text-sm transition-all duration-300">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const stars = Math.round(plant.rating?.average || plant.ratings?.average || 0);
  const avgRating = plant.rating?.average || plant.ratings?.average || 0;
  const ratingCount = plant.rating?.count || plant.ratings?.count || 0;
  const catColor = categoryColors[plant.category] || 'from-emerald-900/50 to-teal-900/50';

  return (
    <div className="min-h-screen bg-deep-forest font-body pt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/plants" className="inline-flex items-center gap-2 text-stone hover:text-ivory transition-colors text-sm mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br overflow-hidden border border-white/[0.06] relative flex items-center justify-center" style={{ backgroundImage: `linear-gradient(to bottom right, var(--color-${plant.category === 'indoor' ? 'emerald' : plant.category === 'outdoor' ? 'amber' : plant.category === 'succulent' ? 'green' : plant.category === 'medicinal' ? 'purple' : 'pink'}-900/50), var(--color-${plant.category === 'indoor' ? 'teal' : plant.category === 'outdoor' ? 'orange' : plant.category === 'succulent' ? 'emerald' : plant.category === 'medicinal' ? 'emerald' : 'rose'}-900/50))` }}>
            {plant.image ? (
              <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <svg className="w-32 h-32 text-ivory/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 3c-1.5 0-3 .8-4 2-1.2 1.5-2 3.5-2 5.5 0 3.5 2 6.5 4 8.5s4 3 6 3c1.5 0 3-.8 4-2 1.2-1.5 2-3.5 2-5.5 0-3.5-2-6.5-4-8.5S13.5 3 12 3z" />
                </svg>
                <span className="text-stone-dark text-xs uppercase tracking-wider">{plant.category}</span>
              </div>
            )}
            {plant.stock <= 5 && plant.stock > 0 && (
              <span className="absolute top-4 left-4 bg-clay/90 text-ivory text-xs px-3 py-1.5 rounded-full uppercase tracking-wider font-medium">
                Low stock
              </span>
            )}
            {plant.stock === 0 && (
              <span className="absolute top-4 left-4 bg-stone-dark/90 text-ivory text-xs px-3 py-1.5 rounded-full uppercase tracking-wider font-medium">
                Out of stock
              </span>
            )}
            {plant.isMedicinal && (
              <span className="absolute top-4 right-4 bg-emerald/30 text-emerald text-xs px-3 py-1.5 rounded-full uppercase tracking-wider font-medium backdrop-blur-sm">
                Medicinal
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-stone-dark text-sm uppercase tracking-[0.2em]">{plant.category}</span>
            <h1 className="font-display text-4xl md:text-5xl text-ivory mt-2 leading-tight">{plant.name}</h1>

            <div className="flex items-center gap-4 mt-4">
              <span className="font-display text-3xl text-emerald">₹{plant.price}</span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < stars ? 'text-gold' : 'text-surface-lighter'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-stone-dark text-sm ml-1">({ratingCount})</span>
              </div>
            </div>

            <p className="text-stone leading-relaxed mt-6">{plant.description}</p>

            <div className="flex items-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className={plant.stock > 0 ? 'text-emerald' : 'text-clay'}>
                  {plant.stock > 0 ? `${plant.stock} in stock` : 'Out of stock'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-stone">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Free delivery</span>
              </div>
            </div>

            {plant.stock > 0 && (
              <div className="flex items-center gap-4 mt-8">
                <div className="flex items-center border border-surface-lighter rounded-xl">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-3 text-stone hover:text-ivory transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="px-4 py-3 text-ivory font-medium min-w-[3ch] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min(plant.stock, q + 1))}
                    className="px-4 py-3 text-stone hover:text-ivory transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={plant.stock === 0}
                  className={`flex-1 px-8 py-3 rounded-xl text-sm font-medium transition-all duration-300 active:scale-95 ${
                    added
                      ? 'bg-emerald-dark text-ivory'
                      : 'bg-emerald hover:bg-emerald-dark text-deep-forest'
                  } disabled:bg-stone-dark disabled:text-stone disabled:cursor-not-allowed`}
                >
                  {added ? 'Added!' : 'Add to Cart'}
                </button>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-6">
              <span className="px-3 py-1 bg-surface text-stone-dark text-xs rounded-full capitalize border border-surface-light">
                {plant.category}
              </span>
              {plant.featured && (
                <span className="px-3 py-1 bg-gold/10 text-gold text-xs rounded-full border border-gold/20">
                  Featured
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface rounded-2xl border border-surface-light p-8">
            <h2 className="font-display text-xl text-ivory mb-6 flex items-center gap-3">
              <svg className="w-5 h-5 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Care Guide
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Watering', value: plant.careGuide?.wateringSchedule, icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
                { label: 'Sunlight', value: plant.careGuide?.sunlightRequirement, icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' },
                { label: 'Soil', value: plant.careGuide?.soilType, icon: 'M19 9l-7 7-7-7' },
                { label: 'Temperature', value: plant.careGuide?.temperature, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                { label: 'Humidity', value: plant.careGuide?.humidity, icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
                { label: 'Repot every', value: plant.careGuide?.soilChangeFrequency, icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
              ].filter(item => item.value).map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-emerald mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  <div>
                    <p className="text-stone-dark text-xs uppercase tracking-wider">{item.label}</p>
                    <p className="text-ivory text-sm mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {plant.isMedicinal && plant.medicalProperties && (
            <div className="bg-surface rounded-2xl border border-surface-light p-8">
              <h2 className="font-display text-xl text-ivory mb-6 flex items-center gap-3">
                <svg className="w-5 h-5 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Medicinal Properties
              </h2>
              <div className="space-y-5">
                {plant.medicalProperties.uses?.length > 0 && (
                  <div>
                    <p className="text-stone-dark text-xs uppercase tracking-wider mb-2">Uses</p>
                    <div className="flex flex-wrap gap-2">
                      {plant.medicalProperties.uses.map(u => (
                        <span key={u} className="px-3 py-1 bg-emerald/10 text-emerald text-xs rounded-full">{u}</span>
                      ))}
                    </div>
                  </div>
                )}
                {plant.medicalProperties.benefits && (
                  <div>
                    <p className="text-stone-dark text-xs uppercase tracking-wider mb-1">Benefits</p>
                    <p className="text-ivory text-sm leading-relaxed">{plant.medicalProperties.benefits}</p>
                  </div>
                )}
                {plant.medicalProperties.partsUsed && (
                  <div>
                    <p className="text-stone-dark text-xs uppercase tracking-wider mb-1">Parts Used</p>
                    <p className="text-ivory text-sm">{plant.medicalProperties.partsUsed}</p>
                  </div>
                )}
                {plant.medicalProperties.dosageInfo && (
                  <div>
                    <p className="text-stone-dark text-xs uppercase tracking-wider mb-1">How to Use</p>
                    <p className="text-ivory text-sm leading-relaxed">{plant.medicalProperties.dosageInfo}</p>
                  </div>
                )}
                {plant.medicalProperties.precautions && (
                  <div className="bg-clay/10 rounded-xl p-4 border border-clay/10">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-clay mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.37 0 2.434-.94 2.434-2.1 0-.55-.26-1.07-.72-1.46L13.354 4.54c-.61-.6-1.46-.9-2.354-.9s-1.744.3-2.354.9L2.386 15.34c-.46.39-.72.91-.72 1.46 0 1.16 1.064 2.1 2.434 2.1z" />
                      </svg>
                      <div>
                        <p className="text-clay text-xs uppercase tracking-wider">Precautions</p>
                        <p className="text-ivory text-sm mt-0.5">{plant.medicalProperties.precautions}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {(!plant.isMedicinal || !plant.medicalProperties) && (
            <div className="bg-surface rounded-2xl border border-surface-light p-8 flex flex-col items-center justify-center text-center">
              <svg className="w-16 h-16 text-emerald/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-stone text-sm">This plant has no known medicinal properties.</p>
              <p className="text-stone-dark text-xs mt-2">It's still a great addition to your collection!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
