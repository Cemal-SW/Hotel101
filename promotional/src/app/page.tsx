import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import Rooms from "@/components/Rooms";
import Amenities from "@/components/Amenities";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

const RESERVATION_URL = process.env.NEXT_PUBLIC_RESERVATION_URL || "http://localhost:3001";

export default function Home() {
  return (
    <>
      <Navbar reservationUrl={RESERVATION_URL} />
      <main>
        <Hero reservationUrl={RESERVATION_URL} />
        <Welcome />
        <Rooms reservationUrl={RESERVATION_URL} />
        <Amenities />
        <Location reservationUrl={RESERVATION_URL} />
      </main>
      <Footer reservationUrl={RESERVATION_URL} />
    </>
  );
}
