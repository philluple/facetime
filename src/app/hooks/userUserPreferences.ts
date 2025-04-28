"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useUser } from "@clerk/nextjs";
import { MeetingPreferences } from "@/type/preferences/MeetingPreferences";
import { defaultMeetingPreferences } from "@/type/preferences/defaultMeetingPreferences";
import { MeetingType } from "@/type/meeting";
export function useUserPreferences() {
  const { user } = useUser();
  const [prefs, setPrefs] = useState<MeetingPreferences>(
    defaultMeetingPreferences
  );
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
        setPrefs(snap.data().settings as MeetingPreferences);
      } else {
        await setDoc(ref, { settings: defaultMeetingPreferences });
        setPrefs(defaultMeetingPreferences);
      }

      setLoading(false);
    };

    fetchOrCreatePreferences();
  }, [user]);

  const handleChange = (
    key: keyof MeetingPreferences,
    value: MeetingType[] | "None"
  ) => {
    const updated = {
      ...prefs,
      [key]: value,
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
