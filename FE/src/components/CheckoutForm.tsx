"use client";

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

type Props = {
  clientSecret: string;
  planId: string;
};

export default function CheckoutForm({ clientSecret, planId }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet.");
      return;
    }

    setLoading(true);
    const card = elements.getElement(CardElement);
    if (!card) {
      setMessage("Card element not found");
      setLoading(false);
      return;
    }

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      if (result.error) {
        setMessage(result.error.message || "Payment failed");
      } else if (
        result.paymentIntent &&
        result.paymentIntent.status === "succeeded"
      ) {
        setMessage("Payment succeeded");
      }
    } catch (err) {
      setMessage((err as Error).message);
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 border-2 border-gray-200 rounded-xl bg-white shadow-lg max-w-md mx-auto"
    >
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Complete Your Payment
        </h3>
        <p className="text-sm text-gray-600">
          Subscribe to the {planId.replace("plan_", "").replace("_", " ")} plan
        </p>
      </div>

      <div className="p-4 border-2 border-gray-300 rounded-lg bg-gray-50 focus-within:border-blue-500 focus-within:bg-white transition-all">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      <button
        disabled={!stripe || loading}
        className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing…
          </span>
        ) : (
          `Pay Now`
        )}
      </button>

      {message && (
        <div
          className={`text-sm text-center p-3 rounded-lg ${
            message.includes("succeeded")
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      <div className="text-xs text-center text-gray-500">
        <p>🔒 Secure payment powered by Stripe</p>
      </div>
    </form>
  );
}
