import { Metadata } from "next";
import StayDirectory from "@/components/StayDirectory";

export const metadata: Metadata = {
  title: "Stay With Us - Airbnb Cottages & 4BHK Villa | Milan Farm Stays",
  description:
    "Explore our 2 BHK plantation cottages and 4 BHK grand estate villa at Milan Farm Stay in Mudigere, Chikmagalur. Pure vegetarian homestay nestled in a 3-acre coffee plantation.",
  openGraph: {
    title: "Stay With Us - Airbnb Cottages & 4BHK Villa | Milan Farm Stays",
    description:
      "Explore our 2 BHK plantation cottages and 4 BHK grand estate villa at Milan Farm Stay in Mudigere, Chikmagalur.",
    images: ["/images/stays/hornbill-1.jpg"],
  },
};

export default function StayPage() {
  return <StayDirectory />;
}

