// app/profile/page.js
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Decode with Hriday | Profile',
  description: 'Your Profile',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function ProfilePage() {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login'); // Use next/navigation for server-side redirect
    }

    // Determine membership status (placeholder logic - integrate with your actual membership system)
    const isPremium = user.user_metadata?.is_premium || false; //  Replace with REAL check
    const membershipStatus = isPremium ? "Premium Member" : "Free User";


    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
                {/* Banner Section */}
                <section className="bg-blue-500 dark:bg-blue-700 text-white py-12">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold">Your Profile</h1>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 max-w-3xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center md:items-start">
                            {/* Profile Picture */}
                            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6">
                                <Image
                                    src="/default-avatar.png" // Put a default-avatar.png in your /public folder
                                    alt="Profile Picture"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>

                            {/* User Details */}
                            <div className="flex-grow">
                                <h2 className="text-2xl font-semibold mb-2">
                                    {user.user_metadata?.full_name || "User"}  {/* Show full name, or "User" if not available */}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-1">Email: {user.email}</p>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Membership Status: <span className={isPremium ? "text-green-500 font-semibold" : "text-gray-500"}>{membershipStatus}</span>
                                </p>

                                {/* Call to Action */}
                                 <Link href="/blogs">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300">
                                        Explore Blogs
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

