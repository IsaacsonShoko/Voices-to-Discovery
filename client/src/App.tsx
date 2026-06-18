import { useState } from "react";
import { apiRequest } from "./api";
import AfricanGenomeProject from "./components/AfricanGenomeProject";
import Declaration from "./components/Declaration";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Imagine2040 from "./components/Imagine2040";
import JoinTheMovement from "./components/JoinTheMovement";
import MissingVoices from "./components/MissingVoices";
import Navbar from "./components/Navbar";
import SignupModal from "./components/SignupModal";
import Stories from "./components/Stories";
import TheJourney from "./components/TheJourney";
import WhyRepresentationMatters from "./components/WhyRepresentationMatters";
import WhyVoicesMatter from "./components/WhyVoicesMatter";
import type { JoinPayload, RequestResult } from "./types";

export default function App() {
  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
  const [signupContext, setSignupContext] = useState<{
    isOpen: boolean;
    audienceType?: string;
  }>({
    isOpen: false,
    audienceType: "",
  });

  async function submitJoiner(payload: JoinPayload): Promise<RequestResult> {
    return apiRequest<RequestResult>("/api/joiners", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  function openSignupForm(audienceType: string) {
    setSignupContext({
      isOpen: true,
      audienceType,
    });
  }

  function closeSignupForm() {
    setSignupContext((current) => ({ ...current, isOpen: false }));
  }

  if (pathname === "/why-representation-matters") {
    return (
      <div className="app-shell">
        <Navbar />
        <WhyRepresentationMatters />
        <Footer onNewsletterSubmit={submitJoiner} />
        <SignupModal
          isOpen={signupContext.isOpen}
          initialAudienceType={signupContext.audienceType}
          onClose={closeSignupForm}
          onSubmit={submitJoiner}
        />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Hero />
        <MissingVoices />
        <WhyVoicesMatter />
        <TheJourney />
        <Stories />
        <AfricanGenomeProject />
        <Imagine2040 />
        <JoinTheMovement onOpenForm={openSignupForm} />
        <Declaration />
      </main>
      <Footer onNewsletterSubmit={submitJoiner} />
      <SignupModal
        isOpen={signupContext.isOpen}
        initialAudienceType={signupContext.audienceType}
        onClose={closeSignupForm}
        onSubmit={submitJoiner}
      />
    </div>
  );
}
