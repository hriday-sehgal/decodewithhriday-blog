// components/ContactForm.js
"use client";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      // Send Email & Save via API Route
      const res = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to send email.');
      }

      toast.success("Message sent successfully!");

      // Clear form
      setName('');
      setEmail('');
      setMessage('');

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(`Submission failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-1.5 select-none">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-white/60 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 text-sm placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-zinc-200"
            placeholder="Your Name"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-1.5 select-none">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/60 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 text-sm placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-zinc-200"
            placeholder="your@email.com"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-1.5 select-none">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            className="w-full px-4 py-3 bg-white/60 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 text-sm placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-zinc-200 resize-none"
            placeholder="How can we help you?"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center py-3.5 px-6 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-violet-600 hover:bg-violet-750 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-200 ${
            loading ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending Message...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </>
  );
}
