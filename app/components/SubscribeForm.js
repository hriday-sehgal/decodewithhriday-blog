// app/components/SubscribeForm.js
'use client'
import { useState } from 'react';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';

export default function SubscribeForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to subscribe.');
      }
      
      setMessage({ type: 'success', text: 'Thank you for subscribing to the newsletter!' });
      setName('');
      setEmail('');

    } catch (error) {
      console.error("Subscription error:", error);
      setMessage({ type: 'error', text: `Subscription failed: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm overflow-hidden">
      {/* Subtle border glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-md mx-auto text-center space-y-2 mb-6">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-zinc-100">
          Subscribe to the Newsletter
        </h2>
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          Join a developer community. Get monthly updates on system architectures, tools, and tutorials.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sub-name" className="block text-xs font-bold uppercase tracking-wider text-slate-450 dark:text-zinc-550 mb-1.5 select-none">
              Name
            </label>
            <input
              type="text"
              id="sub-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/60 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 text-sm placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-zinc-200"
              placeholder="Your Name"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="sub-email" className="block text-xs font-bold uppercase tracking-wider text-slate-450 dark:text-zinc-550 mb-1.5 select-none">
              Email
            </label>
            <input
              type="email"
              id="sub-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/60 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 text-sm placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-zinc-200"
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-violet-600 hover:bg-violet-750 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-200 ${
            loading ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg'
          }`}
        >
          {loading ? (
            <FaSpinner className="animate-spin w-4 h-4 mr-2" />
          ) : (
            <FaPaperPlane className="w-3.5 h-3.5 mr-2" />
          )}
          {loading ? "Subscribing..." : "Subscribe"}
        </button>

        {message && (
          <div
            className={`p-3.5 rounded-xl text-xs font-medium text-center transition-all ${
              message.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-600 dark:text-rose-450 border border-rose-500/20'
            }`}
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}
