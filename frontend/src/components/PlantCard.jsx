import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { getPlantImage } from '../utils/plantImages';

export default function PlantCard({ plant }) {
  const stars = Math.round(plant.rating?.average || 0);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-surface rounded-2xl border border-surface-light overflow-hidden transition-all duration-500 hover:border-emerald/40 hover:shadow-[0_0_40px_rgba(52,211,153,0.15)]"
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/plants/${plant._id}`} className="block">
        <div className="aspect-[4/3] bg-gradient-to-br from-surface-lighter to-surface-light flex items-center justify-center overflow-hidden relative">
          {(() => { const imgSrc = plant.image || getPlantImage(plant); return imgSrc ? (
            <img src={imgSrc} alt={plant.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <svg className="w-16 h-16 text-stone/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 3c-1.5 0-3 .8-4 2-1.2 1.5-2 3.5-2 5.5 0 3.5 2 6.5 4 8.5s4 3 6 3c1.5 0 3-.8 4-2 1.2-1.5 2-3.5 2-5.5 0-3.5-2-6.5-4-8.5S13.5 3 12 3z" />
              </svg>
              <span className="text-stone-dark text-xs uppercase tracking-wider">{plant.category}</span>
            </div>
          )})()}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {plant.stock <= 5 && plant.stock > 0 && (
            <span className="absolute top-3 left-3 bg-clay/90 text-ivory text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-medium">
              Low stock
            </span>
          )}
          {plant.stock === 0 && (
            <span className="absolute top-3 left-3 bg-stone-dark/90 text-ivory text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-medium">
              Out of stock
            </span>
          )}
          <span className="absolute top-3 right-3 bg-deep-forest/70 text-emerald text-[10px] px-2.5 py-1 rounded-full capitalize backdrop-blur-sm">
            {plant.category}
          </span>
        </div>
        <div className="p-5" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-ivory font-display text-lg group-hover:text-emerald transition-colors duration-300">{plant.name}</h3>
          <p className="text-stone-dark text-sm mt-1.5 line-clamp-2 leading-relaxed">{plant.description}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-emerald font-display text-xl relative">
              ₹{plant.price}
              <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-emerald/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} className={`w-3.5 h-3.5 ${i < stars ? 'text-gold' : 'text-surface-lighter'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-stone-dark text-xs ml-1">({plant.rating?.count || 0})</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
