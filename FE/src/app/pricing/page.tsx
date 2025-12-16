"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PricingTable from "@/components/PricingTable";

export default function PricingPage() {
  const router = useRouter();

  function handleBuy(planId: string) {
    // Redirect to checkout page with planId as query param
    router.push(`/checkout?planId=${planId}`);
  }

  return (
    <div className="space-y-8">
      <PricingTable onBuy={handleBuy} />
    </div>
  );
}
