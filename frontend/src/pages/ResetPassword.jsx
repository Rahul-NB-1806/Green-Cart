import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/api';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim() || !confirmPassword.trim()) {
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
      await resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed. The link may have expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-deep-forest font-body pt-16">
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-surface rounded-2xl border border-surface-light p-8">
          <h2 className="font-display text-3xl text-ivory text-center">Reset Password</h2>
          <p className="text-stone text-sm text-center mt-2">
            {success ? 'Password changed successfully!' : 'Enter your new password'}
          </p>

          {!success ? (
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-clay/10 border border-clay/10 rounded-xl px-4 py-3">
                  <p className="text-clay text-sm">{error}</p>
                </div>
              )}
              <div>
                <label className="block text-stone text-sm mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-deep-forest border border-surface-lighter rounded-xl px-4 py-3 text-ivory placeholder:text-stone-dark focus:outline-none focus:border-emerald/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-stone text-sm mb-2">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
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
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          ) : (
            <div className="mt-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-stone text-sm">
                Redirecting you to sign in...
              </p>
            </div>
          )}

          <p className="text-stone text-sm text-center mt-6">
            <Link to="/login" className="text-emerald hover:text-emerald-dark transition-colors">
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
