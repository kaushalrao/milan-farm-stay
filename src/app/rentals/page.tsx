import { Metadata } from "next";
import RentalsDirectory from "@/components/RentalsDirectory";

export const metadata: Metadata = {
  title: "Self-Drive Vehicle Rentals & Local Taxis | Milan Farm Stays",
  description:
    "Book self-drive bikes, scooters, and cars in Sakleshpur (selfdrive.bike) and Chikmagalur, or find trusted local taxis for Milan Farm Stay guests.",
};

export default function RentalsPage() {
  return <RentalsDirectory />;
}

