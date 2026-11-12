import { Metadata } from "next";
import CoffeeOrderForm from "@/components/CoffeeOrderForm";

export const metadata: Metadata = {
  title: "Order Estate Coffee Powder | Milan Farm Stays",
  description:
    "Order authentic, shade-grown Arabica + Chicory filter coffee powder freshly roasted from Milan Farm Stay plantation in Mudigere / Chikmagalur.",
};

export default function OrderCoffeePage() {
  return (
    <main className="min-h-screen bg-[#FCFBF8] dark:bg-[#121212] text-text-main font-sans">
      <CoffeeOrderForm />
    </main>
  );
}

