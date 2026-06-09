import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-deep-forest font-body pt-16">
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-surface rounded-2xl border border-surface-light p-8">
          <h2 className="font-display text-3xl text-ivory text-center">Create Account</h2>
          <p className="text-stone text-sm text-center mt-2">Join GreenCart and start shopping</p>
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-clay/10 border border-clay/10 rounded-xl px-4 py-3">
                <p className="text-clay text-sm">{error}</p>
              </div>
            )}
            <div>
              <label className="block text-stone text-sm mb-2">Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-deep-forest border border-surface-lighter rounded-xl px-4 py-3 text-ivory placeholder:text-stone-dark focus:outline-none focus:border-emerald/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-stone text-sm mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-deep-forest border border-surface-lighter rounded-xl px-4 py-3 text-ivory placeholder:text-stone-dark focus:outline-none focus:border-emerald/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-stone text-sm mb-2">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-deep-forest border border-surface-lighter rounded-xl px-4 py-3 text-ivory placeholder:text-stone-dark focus:outline-none focus:border-emerald/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-stone text-sm mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-deep-forest border border-surface-lighter rounded-xl px-4 py-3 text-ivory placeholder:text-stone-dark focus:outline-none focus:border-emerald/50 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald hover:bg-emerald-dark text-deep-forest font-medium py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>
          <p className="text-stone text-sm text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald hover:text-emerald-dark transition-colors">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
