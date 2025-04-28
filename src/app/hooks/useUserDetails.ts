"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useUser } from "@clerk/nextjs";

export type UserDetails = {
  pronouns: string | null;
  bio: string | null;
  linkedin: string | null;
  github: string | null;
  instagram: string | null;
};

const defaultUserDetails: UserDetails = {
  pronouns: null,
  bio: null,
  linkedin: null,
  github: null,
  instagram: null,
};

export function useUserDetails() {
  const { user } = useUser();
  const [details, setDetails] = useState<UserDetails>(defaultUserDetails);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrCreateDetails = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const ref = doc(db, "userDetails", user.id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setDetails(snap.data().details as UserDetails);
      } else {
        await setDoc(ref, { details: defaultUserDetails });
        setDetails(defaultUserDetails);
      }

      setLoading(false);
    };

    fetchOrCreateDetails();
  }, [user]);

  const handleChange = (key: keyof UserDetails, value: string) => {
    const updated = {
      ...details,
      [key]: value,
    };
    setDetails(updated);

    if (user) {
      setDoc(
        doc(db, "userDetails", user.id),
        { details: updated },
        { merge: true }
      );
    }
  };

  return { details, loading, handleChange };
}
