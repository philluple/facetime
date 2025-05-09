"use client";

import { useState } from "react";
import { MeetingType } from "@/type/meeting";
interface MeetingTypeSelectorProps {
  value: MeetingType;
  onChange: (type: MeetingType) => void;
}

export default function MeetingTypeSelector({
  value,
  onChange,
}: MeetingTypeSelectorProps) {
  const types: MeetingType[] = [
    "1-on-1",
    "group",
    "webinar",
    "class",
    "casual",
  ];

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Meeting Type</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as MeetingType)}
        className="border border-gray-300 rounded px-3 py-2 text-sm"
      >
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}
