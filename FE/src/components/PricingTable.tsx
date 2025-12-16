import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

export type Plan = {
  id: string;
  name: string;
  price: string;
  priceCents: number;
  notes?: string;
  transactions: string;
  features: {
    multiLLM: boolean;
    multiLLMNote?: string;
    privateLLMKeys: boolean;
    documentAgents: string;
    customWorkflows: boolean;
    ssoRBAC: boolean;
    vpcOnPrem: boolean;
    support: string;
  };
};

const PLANS: Plan[] = [
  {
    id: "plan_starter",
    name: "Starter",
    price: "$25/month",
    priceCents: 2500,
    notes: "(5¢ per transaction)",
    transactions: "500",
    features: {
      multiLLM: true,
      privateLLMKeys: false,
      documentAgents: "Limited",
      customWorkflows: false,
      ssoRBAC: false,
      vpcOnPrem: false,
      support: "Community",
    },
  },
  {
    id: "plan_pro",
    name: "Pro",
    price: "$400/month",
    priceCents: 40000,
    notes: "(4¢ per transaction)",
    transactions: "10,000",
    features: {
      multiLLM: true,
      privateLLMKeys: true,
      documentAgents: "Full",
      customWorkflows: false,
      ssoRBAC: true,
      vpcOnPrem: false,
      support: "Fast Line",
    },
  },
  {
    id: "plan_enterprise",
    name: "Enterprise",
    price: "Custom",
    priceCents: 0,
    notes: "",
    transactions: "Custom",
    features: {
      multiLLM: true,
      multiLLMNote: "+ Open Source LLMs",
      privateLLMKeys: true,
      documentAgents: "Full",
      customWorkflows: true,
      ssoRBAC: true,
      vpcOnPrem: true,
      support: "Dedicated CSM",
    },
  },
];

export default function PricingTable({
  onBuy,
}: {
  onBuy: (planId: string) => void;
}) {
  const [selectedPlan, setSelectedPlan] = useState<string>("plan_enterprise");

  useEffect(() => {
    console.log("Selected Plan:", selectedPlan);
  }, [selectedPlan]);

  const renderCheckmark = (enabled: boolean, note?: string) => {
    if (enabled) {
      return (
        <span className="flex items-center justify-center gap-1">
          <Check className="text-green-600" size={24} strokeWidth={3} />
          {note && <span className="text-sm text-gray-700">{note}</span>}
        </span>
      );
    }
    return (
      <span className="flex items-center justify-center">
        <X className="text-red-600" size={24} strokeWidth={3} />
      </span>
    );
  };

  const renderPlanColumn = (plan: Plan) => {
    const isSelected = selectedPlan === plan.id;

    const selectedCol = isSelected ? "bg-blue-50 border-x-2 border-blue-400" : "";

    return (
      <div
        key={plan.id}
        className="col-span-1 cursor-pointer"
        onClick={() => setSelectedPlan(plan.id)}
      >
        {/* Header */}
        <div
          className={`h-20 flex items-center justify-center p-4 font-bold text-lg text-center border-b border-gray-300 ${
            isSelected ? "bg-blue-50 border-x-2 border-blue-400 text-blue-600" : "bg-gray-50"
          }`}
        >
          {plan.name}
        </div>

        {/* Price */}
        <div
          className={`h-20 flex flex-col items-center justify-center p-4 border-b border-gray-300 ${selectedCol}`}
        >
          <div className="font-bold">{plan.price}</div>
          {plan.notes && <div className="text-sm text-gray-500">{plan.notes}</div>}
        </div>

        {/* Monthly Transactions */}
        <div
          className={`h-16 flex items-center justify-center p-4 border-b border-gray-300 ${selectedCol}`}
        >
          {plan.transactions}
        </div>

        {/* Multi LLM */}
        <div
          className={`h-16 flex items-center justify-center p-4 border-b border-gray-300 ${selectedCol}`}
        >
          {renderCheckmark(plan.features.multiLLM, plan.features.multiLLMNote)}
        </div>

        {/* Private API Keys */}
        <div
          className={`h-16 flex items-center justify-center p-4 border-b border-gray-300 ${selectedCol}`}
        >
          {renderCheckmark(plan.features.privateLLMKeys)}
        </div>

        {/* Document Agents */}
        <div
          className={`h-16 flex items-center justify-center p-4 border-b border-gray-300 ${selectedCol}`}
        >
          {plan.features.documentAgents}
        </div>

        {/* Custom Workflows */}
        <div
          className={`h-16 flex items-center justify-center p-4 border-b border-gray-300 ${selectedCol}`}
        >
          {renderCheckmark(plan.features.customWorkflows)}
        </div>

        {/* SSO & RBAC */}
        <div
          className={`h-16 flex items-center justify-center p-4 border-b border-gray-300 ${selectedCol}`}
        >
          {renderCheckmark(plan.features.ssoRBAC)}
        </div>

        {/* VPC */}
        <div
          className={`h-16 flex items-center justify-center p-4 border-b border-gray-300 ${selectedCol}`}
        >
          {renderCheckmark(plan.features.vpcOnPrem)}
        </div>

        {/* Support */}
        <div
          className={`h-16 flex items-center justify-center p-4 border-b border-gray-300 ${selectedCol}`}
        >
          {plan.features.support}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-center  my-8 bg-gray-100 px-6 py-3 rounded-lg mx-auto block w-fit">
        Pricing
      </h1>

      <div className="grid grid-cols-4 gap-0 bg-white rounded-lg overflow-hidden border border-gray-300">
        <div className="col-span-1">
          <div className="h-20 flex items-center justify-center p-4 font-bold text-lg bg-gray-50 border-b border-gray-300">
            Feature
          </div>
          <div className="h-20 flex items-center justify-center p-4 font-semibold bg-gray-50 border-b border-gray-300">
            Cost
          </div>
          <div className="h-16 flex items-center justify-center p-4 font-semibold bg-gray-50 border-b border-gray-300">
            Monthly Transactions
          </div>
          <div className="h-16 flex items-center justify-center p-4 font-semibold bg-gray-50 border-b border-gray-300">
            Multi-LLM
          </div>
          <div className="h-16 flex items-center justify-center p-4 font-semibold bg-gray-50 border-b border-gray-300">
            Private LLM API Keys
          </div>
          <div className="h-16 flex items-center justify-center p-4 font-semibold bg-gray-50 border-b border-gray-300">
            Document Agents
          </div>
          <div className="h-16 flex items-center justify-center p-4 font-semibold bg-gray-50 border-b border-gray-300">
            Custom Workflows
          </div>
          <div className="h-16 flex items-center justify-center p-4 font-semibold bg-gray-50 border-b border-gray-300">
            SSO & RBAC
          </div>
          <div className="h-16 flex items-center justify-center p-4 font-semibold bg-gray-50 border-b border-gray-300">
            VPC / On-Prem
          </div>
          <div className="h-16 flex items-center justify-center p-4 font-semibold bg-gray-50">
            Dedicated Support
          </div>
        </div>

        {PLANS.map((plan) => renderPlanColumn(plan))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => onBuy?.(selectedPlan)}
          disabled={!selectedPlan}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Buy {selectedPlan} Plan
        </button>
      </div>

      <div className="mt-6 text-center text-sm text-gray-600 bg-gray-100 py-3 rounded-lg">
        Transaction = One API call or One Processed Page
      </div>
    </div>
  );
}
