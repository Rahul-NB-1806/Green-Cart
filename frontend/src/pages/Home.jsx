import { Link } from 'react-router-dom';
import PlantCard from '../components/PlantCard';
import useInView from '../hooks/useInView';

const featuredPlants = [
  { _id: "1", name: "Snake Plant", price: 499, category: "indoor", image: "", description: "Hardy, air-purifying plant that thrives on neglect. Perfect for beginners.", rating: { average: 4.5 }, stock: 15 },
  { _id: "2", name: "Aloe Vera", price: 349, category: "succulent", image: "", description: "Healing succulent with medicinal properties. Easy to grow in bright light.", rating: { average: 4.7 }, stock: 8 },
  { _id: "3", name: "Monstera Deliciosa", price: 899, category: "indoor", image: "", description: "Iconic split-leaf tropical plant that makes a bold statement in any room.", rating: { average: 4.8 }, stock: 5 },
  { _id: "4", name: "Lavender", price: 299, category: "outdoor", image: "", description: "Fragrant purple blooms that attract pollinators and calm the mind.", rating: { average: 4.3 }, stock: 20 },
  { _id: "5", name: "Tulsi (Holy Basil)", price: 199, category: "medicinal", image: "", description: "Sacred Indian herb with powerful adaptogenic and immune-boosting properties.", rating: { average: 4.9 }, stock: 25 },
  { _id: "6", name: "Peace Lily", price: 599, category: "flowering", image: "", description: "Elegant white blooms and glossy leaves. One of the best air-purifying plants.", rating: { average: 4.6 }, stock: 10 },
  { _id: "7", name: "Jade Plant", price: 449, category: "succulent", image: "", description: "Lucky money plant with thick, oval-shaped leaves. Symbol of prosperity.", rating: { average: 4.4 }, stock: 12 },
  { _id: "8", name: "ZZ Plant", price: 549, category: "indoor", image: "", description: "Nearly indestructible with waxy green leaves. Thrives on neglect — the ultimate beginner plant.", rating: { average: 4.6 }, stock: 20 },
  { _id: "9", name: "Hibiscus", price: 449, category: "outdoor", image: "", description: "Tropical beauty with large, showy flowers in vibrant colors.", rating: { average: 4.5 }, stock: 16 },
  { _id: "10", name: "Spider Plant", price: 349, category: "indoor", image: "", description: "Classic trailing plant with arching green-and-white leaves that produces baby spiders.", rating: { average: 4.4 }, stock: 30 },
  { _id: "11", name: "Echeveria", price: 249, category: "succulent", image: "", description: "Rosette-shaped succulent with plump pastel leaves. Stunning in any arrangement.", rating: { average: 4.3 }, stock: 35 },
  { _id: "12", name: "Ashwagandha", price: 349, category: "medicinal", image: "", description: "Powerful adaptogenic herb used in Ayurveda for stress reduction and vitality.", rating: { average: 4.5 }, stock: 20 },
  { _id: "13", name: "Rose Plant", price: 399, category: "flowering", image: "", description: "Classic garden rose with fragrant blooms in red, pink, yellow, and white.", rating: { average: 4.6 }, stock: 24 },
  { _id: "14", name: "Bougainvillea", price: 549, category: "outdoor", image: "", description: "Drought-tolerant climber with vibrant papery bracts in pink, purple, and orange.", rating: { average: 4.4 }, stock: 22 },
  { _id: "15", name: "Philodendron Brasil", price: 449, category: "indoor", image: "", description: "Heart-shaped leaves with stunning green and lime variegation. Fast-growing trailing beauty.", rating: { average: 4.5 }, stock: 18 },
  { _id: "16", name: "String of Pearls", price: 399, category: "succulent", image: "", description: "Unique trailing succulent with bead-like leaves. Creates a stunning waterfall effect.", rating: { average: 4.7 }, stock: 14 },
];

const testimonials = [
  { quote: "GreenCart completely transformed my apartment. Their plants arrived in perfect condition and the care guides made it so easy to keep them thriving.", name: "Priya Sharma", role: "Verified Buyer" },
  { quote: "I've been buying plants online for years, but GreenCart's quality is unmatched. The Monstera I got is absolutely stunning and healthy.", name: "Arjun Mehta", role: "Plant Enthusiast" },
  { quote: "The medicinal plants from GreenCart are incredible. My Tulsi plant is flourishing and I use fresh leaves in my tea every morning.", name: "Ananya Patel", role: "Wellness Coach" },
];

function Reveal({ children, className = '', type = 'reveal', style, ...rest }) {
  const [ref, isVisible] = useInView({ threshold: 0.15 });
  return (
    <div ref={ref} className={`${type} ${isVisible ? 'visible' : ''} ${className}`} style={style} {...rest}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="relative min-h-screen pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-deep-forest to-deep-forest" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald/5 blur-[120px] -top-40 -right-40" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-gold/5 blur-[100px] -bottom-32 -left-32" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center">
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald/10 text-emerald text-xs tracking-[0.2em] uppercase mb-6 border border-emerald/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                New Collection
              </div>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ivory leading-[1.05]">
                Find Your
                <br />
                <span className="gradient-text">Perfect</span>
                <br />
                Green Companion
              </h1>
              <p className="text-stone text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
                Handpicked plants delivered to your door with expert care guides. GreenCart brings nature's finest into your home.
              </p>
              <div className="flex items-center justify-center gap-4 mt-10">
                <Link to="/plants" className="bg-emerald hover:bg-emerald-dark text-deep-forest font-medium px-6 py-3 rounded-xl text-sm transition-all duration-300 active:scale-95">
                  Shop Now
                </Link>
                <Link to="/about" className="border border-stone/30 text-ivory hover:border-emerald/50 px-6 py-3 rounded-xl text-sm transition-all duration-300">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 text-stone-dark pb-8">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <svg className="w-4 h-4 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="py-16 border-y border-emerald/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "500+", label: "Plant Varieties" },
              { num: "50K+", label: "Happy Customers" },
              { num: "4.9★", label: "Average Rating" },
              { num: "99%", label: "Delivery Success" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl gradient-text-gold">{s.num}</p>
                <p className="text-stone text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Plants ─── */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl text-ivory text-center">Featured Plants</h2>
          <p className="text-stone text-center mt-3 max-w-lg mx-auto">
            Curated selections for every space and lifestyle.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {featuredPlants.slice(0, 8).map((plant) => (
              <PlantCard key={plant._id} plant={plant} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl text-ivory text-center">Shop by Category</h2>
          <p className="text-stone text-center mt-3">Find your perfect plant match</p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mt-16">
            {[
              { slug: "indoor", label: "Indoor Plants", count: "10 varieties", gradient: "from-emerald-900/50 to-teal-900/50", icon: "🏠" },
              { slug: "outdoor", label: "Outdoor Plants", count: "4 varieties", gradient: "from-amber-900/50 to-orange-900/50", icon: "☀️" },
              { slug: "succulent", label: "Succulents", count: "5 varieties", gradient: "from-green-900/50 to-emerald-900/50", icon: "🌵" },
              { slug: "medicinal", label: "Medicinal Plants", count: "6 varieties", gradient: "from-purple-900/50 to-emerald-900/50", icon: "🌿" },
              { slug: "flowering", label: "Flowering Plants", count: "6 varieties", gradient: "from-pink-900/50 to-rose-900/50", icon: "🌸" },
            ].map((cat) => (
              <Link
                key={cat.slug}
                to={`/plants?category=${cat.slug}`}
                className="group relative aspect-[3/4] rounded-3xl bg-gradient-to-br overflow-hidden border border-white/[0.06] hover:border-emerald/30 transition-all duration-500"
                style={{ backgroundImage: `linear-gradient(to bottom right, var(--color-${cat.slug === 'indoor' ? 'emerald' : cat.slug === 'outdoor' ? 'amber' : cat.slug === 'succulent' ? 'green' : cat.slug === 'medicinal' ? 'purple' : 'pink'}-900/50), var(--color-${cat.slug === 'indoor' ? 'teal' : cat.slug === 'outdoor' ? 'orange' : cat.slug === 'succulent' ? 'emerald' : cat.slug === 'medicinal' ? 'emerald' : 'rose'}-900/50))` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/80 via-transparent to-transparent" />
                <div className="relative h-full flex flex-col justify-between p-6">
                  <span className="text-4xl">{cat.icon}</span>
                  <div>
                    <h3 className="font-display text-lg text-ivory">{cat.label}</h3>
                    <p className="text-stone-dark text-sm mt-1">{cat.count}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl text-ivory text-center">What Our Customers Say</h2>
          <p className="text-stone text-center mt-3">Real stories from our plant-loving community</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {testimonials.map((t) => (
              <div key={t.name} className="relative bg-deep-forest p-8 rounded-2xl border border-surface-light">
                <svg className="absolute top-4 right-6 w-12 h-12 text-emerald/[0.04]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-stone text-sm leading-relaxed relative z-10">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 mt-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald/20 to-gold/20 flex items-center justify-center text-emerald font-display text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-ivory text-sm font-medium">{t.name}</p>
                    <p className="text-stone-dark text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-6xl text-ivory leading-tight">
            Ready to Transform
            <br />
            <span className="gradient-text">Your Space?</span>
          </h2>
          <p className="text-stone text-lg mt-4 max-w-xl mx-auto">
            Join thousands of happy plant parents. Start your green journey today.
          </p>
          <Link
            to="/plants"
            className="inline-flex items-center gap-2 mt-10 bg-emerald hover:bg-emerald-dark text-deep-forest font-medium px-8 py-4 rounded-xl text-sm transition-all duration-300 active:scale-95"
          >
            Get Started
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
