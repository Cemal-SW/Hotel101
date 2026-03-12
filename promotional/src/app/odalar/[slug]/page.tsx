import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RoomDetailContent from "@/components/RoomDetailContent";
import { roomCatalog } from "@/data/rooms";

const RESERVATION_URL =
  process.env.NEXT_PUBLIC_RESERVATION_URL || "http://localhost:3001";

interface RoomDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return roomCatalog.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: RoomDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = roomCatalog.find((item) => item.slug === slug);

  if (!room) {
    return {
      title: "Oda Bulunamadı | Saros Vadi",
    };
  }

  const readableTitle = room.slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return {
    title: `${readableTitle} | Saros Vadi`,
    description:
      "Saros Vadi odalarının detaylarını, olanaklarını ve rezervasyon bilgilerini keşfedin.",
  };
}

export default async function RoomDetailPage({
  params,
}: RoomDetailPageProps) {
  const { slug } = await params;
  const room = roomCatalog.find((item) => item.slug === slug);

  if (!room) {
    notFound();
  }

  return (
    <>
      <Navbar reservationUrl={RESERVATION_URL} />
      <RoomDetailContent slug={slug} reservationUrl={RESERVATION_URL} />
      <Footer reservationUrl={RESERVATION_URL} />
    </>
  );
}
