// app/components/SubscribeForm.js
'use client'
import { useState } from 'react';
import { supabase } from '@/lib/supabase'; // Import Supabase client

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
            // Insert into Supabase
            const { data, error } = await supabase
                .from('subscribers')
                .insert([{ name, email}])
               

            if (error) {
                throw error; // Throw to be caught by the catch block
            }
           console.log("Data Inserted", data);
            setMessage({ type: 'success', text: 'Thank you for subscribing!' });
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
                Stay updated with our latest news and articles.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Your Name"
                        disabled={loading}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300  dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="your@email.com"
                        disabled={loading}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {loading ? "Subscribing..." : "Subscribe"}
                </button>
                {message && (
                    <div
                        className={`p-3 rounded-md ${message.type === 'success'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                    >
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    );
}
