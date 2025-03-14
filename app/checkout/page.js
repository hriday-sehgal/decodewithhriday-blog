// app/checkout/page.js (or any other page where you want the button)
"use client"
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const router = useRouter();

    useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, [router, supabase]);


  if(loading){
     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p>Service: Lifetime Premium Membership</p>
      <p>Amount: ₹49</p>
      <br />
      <a
        href="https://rzp.io/rzp/decodewithhriday-premium"
        target="_blank"
        rel="noopener noreferrer" // Good practice for security
        className="razorpay-button"
      >
        Become a Member
      </a>

      <style jsx>{`
        .razorpay-button {
          display: inline-block;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: bold;
          color: #ffffff;
          background-color: #528FF0;
          border: none;
          border-radius: 8px;
          text-align: center;
          text-decoration: none;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          transition: background 0.3s ease-in-out, transform 0.2s;
        }

        .razorpay-button:hover {
          background-color: #426cd0;
          transform: translateY(-2px);
        }

        .razorpay-button:active {
          background-color: #3657a6;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

