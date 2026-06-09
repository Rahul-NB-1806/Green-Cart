export default function About() {
  const values = [
    {
      title: 'Quality',
      desc: 'We handpick every plant to ensure it meets our rigorous standards for health, size, and beauty before it reaches your doorstep.',
      icon: (
        <svg className="w-8 h-8 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Sustainability',
      desc: 'From biodegradable pots to carbon-neutral shipping, we are committed to minimizing our environmental footprint.',
      icon: (
        <svg className="w-8 h-8 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6M4 4l16 16" />
        </svg>
      ),
    },
    {
      title: 'Community',
      desc: 'We partner with local growers and farmers to support sustainable livelihoods and bring you the freshest plants.',
      icon: (
        <svg className="w-8 h-8 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-deep-forest font-body pt-16">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="font-display text-5xl text-ivory">About GreenCart</h1>
        <section className="mt-12">
          <h2 className="font-display text-2xl text-ivory mb-4">Our Story</h2>
          <p className="text-stone leading-relaxed">
            GreenCart was born from a simple idea: make it easy for everyone to bring the beauty of nature into their
            homes. What started as a small neighborhood plant stall has grown into a thriving online marketplace
            connecting plant lovers with the finest greenery. Our journey began with a passion for plants and a belief
            that a greener world starts at home.
          </p>
        </section>
        <section className="mt-12">
          <h2 className="font-display text-2xl text-ivory mb-4">Our Mission</h2>
          <p className="text-stone leading-relaxed">
            We are on a mission to make plant parenthood accessible, joyful, and sustainable. By curating a diverse
            selection of indoor, outdoor, and exotic plants, we help our customers create their own green sanctuaries.
            Every order is packed with care, and every plant comes with the knowledge it needs to thrive.
          </p>
        </section>
        <section className="mt-12">
          <h2 className="font-display text-2xl text-ivory mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-surface p-6 rounded-2xl border border-surface-light">
                {v.icon}
                <h3 className="text-ivory font-display text-xl mt-4">{v.title}</h3>
                <p className="text-stone text-sm mt-2 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
