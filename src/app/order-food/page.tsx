import { Metadata } from "next";
import FoodOrderForm from "@/components/FoodOrderForm";

export const metadata: Metadata = {
  title: "Order Food | Milan Farm Stays",
  description: "Order fresh vegetarian food from Ruchi Home Made Food directly to your farm stay.",
};

export default function OrderFoodPage() {
  return (
    <main className="min-h-screen bg-[#FCFBF8] dark:bg-[#1C1C1C] text-text-main pb-24 font-sans">
      <FoodOrderForm />
    </main>
  );
}
