"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useUser } from "@clerk/nextjs";
import { UserPreferences } from "@/type/preferences/UserPreferences";
import { defaultPreferences } from "@/type/preferences/dfault";

export function useUserPreferences() {
  const { user } = useUser();
  const [prefs, setPrefs] = useState<UserPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrCreatePreferences = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const ref = doc(db, "userPreferences", user.id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setPrefs(snap.data().settings);
      } else {
        await setDoc(ref, { settings: defaultPreferences });
        setPrefs(defaultPreferences);
      }

      setLoading(false);
    };

    fetchOrCreatePreferences();
  }, [user]);

  const handleChange = <
    T extends keyof UserPreferences,
    K extends keyof UserPreferences[T]
  >(
    section: T,
    key: K,
    value: UserPreferences[T][K]
  ) => {
    const updated = {
      ...prefs,
      [section]: {
        ...prefs[section],
        [key]: value,
      },
    };
    setPrefs(updated);

    if (user) {
      setDoc(
        doc(db, "userPreferences", user.id),
        { settings: updated },
        { merge: true }
      );
    }
  };

  return { prefs, loading, handleChange };
}
