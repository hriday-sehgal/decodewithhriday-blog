// app/donate/page.js
"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function DonatePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const supabase = createClientComponentClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    if (!email || !amount || !transactionId) {
      setError("Please fill in all required fields (Email, Amount, and Transaction ID).");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      // 1. Send Email via API Route
      const subject = "New Donation Received!";
      const html = `
       <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <p style="font-size: 16px;">A new donation has been submitted:</p>
        <ul style="list-style: none; padding: 0;">
          <li style="margin-bottom: 8px;"><strong>Name:</strong> ${name || "Anonymous"}</li>
          <li style="margin-bottom: 8px;"><strong>Email:</strong> ${email}</li>
          <li style="margin-bottom: 8px;"><strong>Amount:</strong> ₹${amount}</li>
          <li style="margin-bottom: 8px;"><strong>Transaction ID:</strong> ${transactionId}</li>
          ${message ? `<li style="margin-bottom: 8px;"><strong>Message:</strong> ${message}</li>` : ""}
        </ul>
        <p style="font-size: 14px; margin-top: 20px;">Please verify the donation manually.</p>
        </div>
      `;

      const emailResponse = await fetch('/api/send-donation-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: process.env.NEXT_PUBLIC_SITE_EMAIL, // Send to your support email
          subject: subject,
          html: html,
        }),
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        throw new Error(errorData.error || 'Failed to send email.');
      }

      // 2. Save Donation to Supabase
      const { error: insertError } = await supabase
        .from("donations")
        .insert([
          {
            name,
            email,
            amount,
            transaction_id: transactionId,
            message,
          },
        ]);

      if (insertError) {
        throw new Error("Failed to save donation: " + insertError.message);
      }

      setSuccessMessage(
        "Thank you for your donation! We appreciate your support."
      );

      // Clear form
      setName("");
      setEmail("");
      setAmount("");
      setTransactionId("");
      setMessage("");

    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 md:p-12">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 animate-fade-in">
            Support Decode with Hriday
          </h1>
          <p className="text-lg text-gray-600 mb-8 animate-fade-in">
            Your Contribution Makes a Difference!
          </p>
        </div>


        <div className="mb-10 md:mb-12 animate-fade-up">
            <div className="flex justify-center">
                <Image
                  src="/your-upi-qr-code.png"  // Replace with your actual QR Code
                  alt="UPI QR Code"
                  width={200}
                  height={200}
                  className="rounded-md shadow-md"
                />
            </div>

          <p className="text-center text-gray-700 mt-4">
            Scan to Support via UPI
          </p>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Confirm Your Support
          </h2>
          <p className="text-gray-700 mb-6">
            Please submit your details after completing the payment.
          </p>

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 animate-fade-in" role="alert">
              <strong className="font-bold">Success! </strong>
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 animate-fade-in" role="alert">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name (Optional)
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Support Amount (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">
                Transaction ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message (Optional)
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows="3"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>

              ) : (
                "Submit Details"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}