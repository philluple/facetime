"use client";

import { useUserPreferences } from "@/app/hooks/userUserPreferences";
import PreferencesForm from "@/app/components/PreferencesForm";

export default function VideoSettings() {
  const { prefs, loading, handleChange } = useUserPreferences();

  if (loading) {
    return <div className="p-8 text-center">Loading your settings...</div>;
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <PreferencesForm prefs={prefs} handleChange={handleChange} />
    </main>
  );
}
