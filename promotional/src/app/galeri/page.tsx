import type { Metadata } from "next";
import Footer from "@/components/Footer";
import GalleryPageContent from "@/components/GalleryPageContent";
import Navbar from "@/components/Navbar";

const RESERVATION_URL =
  process.env.NEXT_PUBLIC_RESERVATION_URL || "http://localhost:3001";

export const metadata: Metadata = {
  title: "Galeri | Saros Vadi",
  description:
    "Saros Vadi'nin mimarisini, atmosferini ve yaşam alanlarını yansıtan görsel galeri.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar reservationUrl={RESERVATION_URL} />
      <GalleryPageContent />
      <Footer reservationUrl={RESERVATION_URL} />
    </>
  );
}
