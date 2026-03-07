"use client";

import { useState, useMemo } from "react";
import StepIndicator from "@/components/StepIndicator";
import DateRangePicker from "@/components/DateRangePicker";
import RoomSelector from "@/components/RoomSelector";
import GuestForm, { GuestInfo } from "@/components/GuestForm";
import BookingSummary from "@/components/BookingSummary";
import ConfirmationSuccess from "@/components/ConfirmationSuccess";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageProvider";
import { Room } from "@/components/RoomCard";

const BASE_PRICES: Record<string, number> = {
  "junior-suite-king": 280,
  "junior-suite-twin": 260,
  "superior-king":     210,
  "deluxe-suite":      480,
};

const BASE_SIZES: Record<string, string> = {
  "junior-suite-king": "35 m²",
  "junior-suite-twin": "35 m²",
  "superior-king":     "28 m²",
  "deluxe-suite":      "55 m²",
};

const BASE_IMAGES: Record<string, string> = {
  "junior-suite-king": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
  "junior-suite-twin": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
  "superior-king":     "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
  "deluxe-suite":      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
};

const ROOM_IDS = ["junior-suite-king", "junior-suite-twin", "superior-king", "deluxe-suite"];

const PROMOTIONAL_URL = process.env.NEXT_PUBLIC_PROMOTIONAL_URL || "http://localhost:3000";

interface StayDetails {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
}

export default function ReservationPage() {
  const { t } = useLanguage();

  const [currentStep, setCurrentStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [stayDetails, setStayDetails] = useState<StayDetails>({ checkIn: "", checkOut: "", adults: 1, children: 0 });
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({ firstName: "", lastName: "", email: "", phone: "", specialRequests: "" });

  const nights = useMemo(() => {
    if (!stayDetails.checkIn || !stayDetails.checkOut) return 0;
    return Math.max(0, Math.round(
      (new Date(stayDetails.checkOut).getTime() - new Date(stayDetails.checkIn).getTime()) / (1000 * 60 * 60 * 24)
    ));
  }, [stayDetails.checkIn, stayDetails.checkOut]);

  // Derive the selected room from current translations so it's always up-to-date
  const selectedRoom = useMemo((): Room | undefined => {
    if (!selectedRoomId) return undefined;
    const idx = ROOM_IDS.indexOf(selectedRoomId);
    if (idx === -1) return undefined;
    return {
      id: selectedRoomId,
      name: t.roomSelector.items[idx].name,
      description: t.roomSelector.items[idx].description,
      features: [...t.roomSelector.items[idx].features],
      pricePerNight: BASE_PRICES[selectedRoomId],
      size: BASE_SIZES[selectedRoomId],
      image: BASE_IMAGES[selectedRoomId],
      maxGuests: selectedRoomId === "deluxe-suite" ? 4 : 2,
    };
  }, [selectedRoomId, t]);

  const canProceedStep1 = !!(stayDetails.checkIn && stayDetails.checkOut && nights > 0);
  const canProceedStep2 = !!selectedRoomId;
  const canProceedStep3 = !!(guestInfo.firstName && guestInfo.lastName && guestInfo.email && guestInfo.phone);

  const canProceed =
    currentStep === 1 ? canProceedStep1 :
    currentStep === 2 ? canProceedStep2 :
    currentStep === 3 ? canProceedStep3 :
    true;

  const handleNext = () => { if (currentStep < 4) setCurrentStep(s => s + 1); };
  const handleBack = () => { if (currentStep > 1) setCurrentStep(s => s - 1); };

  const steps = [...t.page.steps];

  if (confirmed) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "var(--dark)" }}>
        <header className="px-6 lg:px-12 h-20 flex items-center justify-between border-b" style={{ borderColor: "var(--border-color)" }}>
          <a href={PROMOTIONAL_URL} className="flex flex-col items-start leading-tight">
            <span className="text-2xl font-bold tracking-widest uppercase" style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)" }}>Saros</span>
            <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>Vadi</span>
          </a>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <ConfirmationSuccess firstName={guestInfo.firstName} email={guestInfo.email} promotionalUrl={PROMOTIONAL_URL} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--dark)" }}>
      <header className="px-6 lg:px-12 h-20 flex items-center justify-between border-b" style={{ borderColor: "var(--border-color)" }}>
        <a href={PROMOTIONAL_URL} className="flex flex-col items-start leading-tight">
          <span className="text-2xl font-bold tracking-widest uppercase" style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)" }}>Saros</span>
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>Vadi</span>
        </a>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href={PROMOTIONAL_URL}
            className="hidden sm:flex items-center gap-2 text-sm opacity-50 hover:opacity-100 transition-opacity duration-300"
            style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            {t.header.backToHotel}
          </a>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 lg:px-12 py-12">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-raleway)" }}>
            {t.page.brand}
          </p>
          <h1 className="text-5xl font-light italic mb-8" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant)" }}>
            {t.page.title}
          </h1>
          <StepIndicator currentStep={currentStep} totalSteps={steps.length} steps={steps} />
        </div>

        <div className="border p-8 md:p-12 mb-8" style={{ borderColor: "var(--border-color)", background: "var(--dark-mid)" }}>
          {currentStep === 1 && (
            <DateRangePicker
              checkIn={stayDetails.checkIn}
              checkOut={stayDetails.checkOut}
              adults={stayDetails.adults}
              children={stayDetails.children}
              onChange={(field, value) => setStayDetails(prev => ({ ...prev, [field]: value }))}
            />
          )}
          {currentStep === 2 && (
            <RoomSelector
              selectedRoomId={selectedRoomId}
              onSelect={setSelectedRoomId}
              nights={nights}
            />
          )}
          {currentStep === 3 && (
            <GuestForm
              guestInfo={guestInfo}
              onChange={(field, value) => setGuestInfo(prev => ({ ...prev, [field]: value }))}
            />
          )}
          {currentStep === 4 && (
            <BookingSummary
              checkIn={stayDetails.checkIn}
              checkOut={stayDetails.checkOut}
              adults={stayDetails.adults}
              children={stayDetails.children}
              room={selectedRoom}
              guestInfo={guestInfo}
              nights={nights}
            />
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 text-sm tracking-wide px-6 py-3 border transition-all duration-300 hover:bg-black/5"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--cream)",
              fontFamily: "var(--font-raleway)",
              opacity: currentStep === 1 ? 0.2 : 1,
              pointerEvents: currentStep === 1 ? "none" : "auto",
              cursor: currentStep === 1 ? "default" : "pointer",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            {t.nav.back}
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={canProceed ? handleNext : undefined}
              className="flex items-center gap-2 text-sm tracking-[0.15em] uppercase px-10 py-3.5 transition-opacity duration-300 hover:opacity-90"
              style={{
                background: "var(--gold)",
                color: "#fff",
                fontFamily: "var(--font-raleway)",
                opacity: canProceed ? 1 : 0.35,
                pointerEvents: canProceed ? "auto" : "none",
                cursor: canProceed ? "pointer" : "default",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {t.nav.continue}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmed(true)}
              className="flex items-center gap-2 text-sm tracking-[0.15em] uppercase px-10 py-3.5 transition-opacity duration-300 hover:opacity-90"
              style={{
                background: "var(--gold)",
                color: "#fff",
                fontFamily: "var(--font-raleway)",
                cursor: "pointer",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {t.nav.confirmReservation}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </button>
          )}
        </div>
      </main>

      <footer className="py-6 px-6 lg:px-12 text-center border-t" style={{ borderColor: "var(--border-color)" }}>
        <p className="text-xs opacity-30 tracking-wide" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>
          © {new Date().getFullYear()} Saros Vadi. {t.footer.copyright}
        </p>
      </footer>
    </div>
  );
}
