"use client";

import { UserPreferences } from "@/type/preferences/UserPreferences";
import { Dispatch, SetStateAction } from "react";

interface PreferencesFormProps {
  prefs: UserPreferences;
  handleChange: (
    section: keyof UserPreferences,
    key: string,
    value: any
  ) => void;
}

export default function PreferencesForm({
  prefs,
  handleChange,
}: PreferencesFormProps) {
  return (
    <main className="p-6 max-w-2xl mx-auto">
      {/* Audio Settings */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Audio Settings</h2>
        <CheckboxSetting
          label="Distort Voice"
          checked={prefs.audio.distortVoice}
          onChange={(v) => handleChange("audio", "distortVoice", v)}
        />
        <CheckboxSetting
          label="Only allow clear audio in 1:1"
          checked={prefs.audio.safeContextOnly}
          onChange={(v) => handleChange("audio", "safeContextOnly", v)}
        />
        <CheckboxSetting
          label="Mute on join"
          checked={prefs.audio.muteOnJoin}
          onChange={(v) => handleChange("audio", "muteOnJoin", v)}
        />
      </section>

      {/* Video Settings */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Video Settings</h2>
        <CheckboxSetting
          label="Blur background"
          checked={prefs.video.blur}
          onChange={(v) => handleChange("video", "blur", v)}
        />
        <CheckboxSetting
          label="Show video only in 1:1"
          checked={prefs.video.onlyShowIn1on1}
          onChange={(v) => handleChange("video", "onlyShowIn1on1", v)}
        />
        <CheckboxSetting
          label="Allow video only in verified rooms"
          checked={prefs.video.verifiedRoomsOnly}
          onChange={(v) => handleChange("video", "verifiedRoomsOnly", v)}
        />
        <SelectSetting
          label="Profile Picture Visibility"
          value={prefs.video.profilePictureVisibility}
          onChange={(v) => handleChange("video", "profilePictureVisibility", v)}
          options={["everyone", "group", "private"]}
        />
      </section>

      {/* Metadata Settings */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Metadata Settings</h2>
        <SelectSetting
          label="Name Visibility"
          value={prefs.metadata.nameVisibility}
          onChange={(v) => handleChange("metadata", "nameVisibility", v)}
          options={["everyone", "group", "private"]}
        />
        <SelectSetting
          label="Pronouns Visibility"
          value={prefs.metadata.pronounsVisibility}
          onChange={(v) => handleChange("metadata", "pronounsVisibility", v)}
          options={["everyone", "group", "private"]}
        />
        <CheckboxSetting
          label="Show interests in 1:1s"
          checked={prefs.metadata.showInterestsIn1on1}
          onChange={(v) => handleChange("metadata", "showInterestsIn1on1", v)}
        />
      </section>
    </main>
  );
}

function CheckboxSetting({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="block py-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mr-2"
      />
      {label}
    </label>
  );
}

function SelectSetting({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block py-2">
      {label}
      <select
        className="ml-2 border border-gray-300 rounded p-1 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
    </label>
  );
}
