"use client";

import { useUserPreferences } from "@/app/hooks/userUserPreferences";
import PreferencesForm from "@/app/components/PreferencesForm"; // ✅ import the reusable form
import { UserPreferences } from "@/type/preferences/UserPreferences";
export default function VideoSettings() {
  const { prefs, loading, handleChange } = useUserPreferences();

  if (loading) {
    return <div className="p-8 text-center">Loading your settings...</div>;
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Video Settings</h1>
      <PreferencesForm
        prefs={prefs}
        handleChange={
          handleChange as (
            section: keyof UserPreferences,
            key: string,
            value: any
          ) => void
        }
      />{" "}
    </main>
  );
}
