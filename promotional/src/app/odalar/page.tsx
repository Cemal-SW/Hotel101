import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RoomsPageContent from "@/components/RoomsPageContent";

const RESERVATION_URL =
  process.env.NEXT_PUBLIC_RESERVATION_URL || "http://localhost:3001";

export const metadata: Metadata = {
  title: "Odalar & Suitler | Saros Vadi",
  description:
    "Saros Vadi'nin zarif ve konforlu odalarını keşfedin. Doğal dokular, seçkin detaylar ve sakin bir konaklama deneyimi sizi bekliyor.",
};

export default function RoomsPage() {
  return (
    <>
      <Navbar reservationUrl={RESERVATION_URL} />
      <RoomsPageContent reservationUrl={RESERVATION_URL} />
      <Footer reservationUrl={RESERVATION_URL} />
    </>
  );
}
