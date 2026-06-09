import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-surface-light">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-display text-2xl text-ivory mb-4">
              Green<span className="text-emerald">Cart</span>
            </h3>
            <p className="text-stone text-sm leading-relaxed">
              Premium plants delivered to your door. Cultivating greener spaces, one plant at a time.
            </p>
          </div>
          <div>
            <h4 className="text-ivory font-medium mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2 text-stone text-sm">
              <Link to="/" className="hover:text-emerald transition-colors">Home</Link>
              <Link to="/plants" className="hover:text-emerald transition-colors">Shop</Link>
              <Link to="/about" className="hover:text-emerald transition-colors">About</Link>
              <Link to="/contact" className="hover:text-emerald transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="text-ivory font-medium mb-4">Categories</h4>
            <div className="flex flex-col gap-2 text-stone text-sm">
              <Link to="/plants?category=indoor" className="hover:text-emerald transition-colors">Indoor</Link>
              <Link to="/plants?category=outdoor" className="hover:text-emerald transition-colors">Outdoor</Link>
              <Link to="/plants?category=succulent" className="hover:text-emerald transition-colors">Succulents</Link>
              <Link to="/plants?category=medicinal" className="hover:text-emerald transition-colors">Medicinal</Link>
            </div>
          </div>
          <div>
            <h4 className="text-ivory font-medium mb-4">Contact</h4>
            <div className="flex flex-col gap-2 text-stone text-sm">
              <span>hello@greencart.com</span>
              <span>+1 (555) 123-4567</span>
              <span>Mumbai, India</span>
            </div>
          </div>
        </div>
        <div className="border-t border-surface-light mt-12 pt-8 text-center text-stone text-xs">
          &copy; {new Date().getFullYear()} GreenCart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
