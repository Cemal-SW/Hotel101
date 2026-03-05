"use client";

import { useState } from "react";
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

  const [stayDetails, setStayDetails] = useState<StayDetails>({
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
  });

  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined);

  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const nights =
    stayDetails.checkIn && stayDetails.checkOut
      ? Math.max(0, Math.round((new Date(stayDetails.checkOut).getTime() - new Date(stayDetails.checkIn).getTime()) / (1000 * 60 * 60 * 24)))
      : 0;

  const handleStayChange = (field: string, value: string | number) => {
    setStayDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleGuestChange = (field: keyof GuestInfo, value: string) => {
    setGuestInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleRoomSelect = (roomId: string, room?: Room) => {
    setSelectedRoomId(roomId);
    if (room) setSelectedRoom(room);
  };

  const canProceedStep1 = stayDetails.checkIn && stayDetails.checkOut && nights > 0;
  const canProceedStep2 = !!selectedRoomId;
  const canProceedStep3 = guestInfo.firstName && guestInfo.lastName && guestInfo.email && guestInfo.phone;
  const canProceed = currentStep === 1 ? canProceedStep1 : currentStep === 2 ? canProceedStep2 : currentStep === 3 ? canProceedStep3 : true;

  const handleNext = () => { if (currentStep < 4) setCurrentStep((s) => s + 1); };
  const handleBack = () => { if (currentStep > 1) setCurrentStep((s) => s - 1); };
  const handleConfirm = () => { setConfirmed(true); };

  const steps = [...t.page.steps];

  const Logo = () => (
    <a href={PROMOTIONAL_URL} className="flex flex-col items-start leading-tight">
      <span className="text-2xl font-bold tracking-widest uppercase" style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)" }}>
        Saros
      </span>
      <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--cream)", fontFamily: "var(--font-raleway)" }}>
        Vadi
      </span>
    </a>
  );

  if (confirmed) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "var(--dark)" }}>
        <header className="px-6 lg:px-12 h-20 flex items-center justify-between border-b" style={{ borderColor: "var(--border-color)" }}>
          <Logo />
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
        <Logo />
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
              onChange={handleStayChange}
            />
          )}
          {currentStep === 2 && (
            <RoomSelector
              selectedRoomId={selectedRoomId}
              onSelect={(id, room) => handleRoomSelect(id, room)}
              nights={nights}
            />
          )}
          {currentStep === 3 && (
            <GuestForm guestInfo={guestInfo} onChange={handleGuestChange} />
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

        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2 text-sm tracking-wide px-6 py-3 border transition-all duration-300 disabled:opacity-20 hover:bg-black/5 disabled:cursor-not-allowed"
            style={{ borderColor: "var(--border-color)", color: "var(--cream)", fontFamily: "var(--font-raleway)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            {t.nav.back}
          </button>

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center gap-2 text-sm tracking-[0.15em] uppercase px-10 py-3.5 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90"
              style={{ background: canProceed ? "var(--gold)" : "var(--gold-tint)", color: "var(--dark)", fontFamily: "var(--font-raleway)" }}
            >
              {t.nav.continue}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              className="flex items-center gap-2 text-sm tracking-[0.15em] uppercase px-10 py-3.5 transition-all duration-300 hover:opacity-90"
              style={{ background: "var(--gold)", color: "var(--dark)", fontFamily: "var(--font-raleway)" }}
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
