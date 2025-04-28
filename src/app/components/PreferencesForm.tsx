"use client";

import {
  MeetingPreferences,
  MeetingPreferenceDisplayNames,
} from "@/type/preferences/MeetingPreferences";
import { MeetingType } from "@/type/meeting";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";

interface PreferencesFormProps {
  prefs: MeetingPreferences;
  handleChange: (
    key: keyof MeetingPreferences,
    value: MeetingType[] | "None"
  ) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  disablePortal: true,
};

// All possible meeting types for selection
const meetingTypes: MeetingType[] = [
  "casual",
  "group",
  "class",
  "webinar",
  "1-on-1",
];

export default function PreferencesForm({
  prefs,
  handleChange,
}: PreferencesFormProps) {
  return (
    <main className="p-6 max-w-2xl mx-auto">
      {Object.entries(prefs).map(([key, value]) => (
        <div key={key} className="mb-6">
          <FormControl fullWidth>
            <InputLabel id={`${key}-label`}>
              {MeetingPreferenceDisplayNames[key as keyof MeetingPreferences]}
            </InputLabel>
            <Select
              labelId={`${key}-label`}
              multiple
              value={value === "None" ? [] : (value as MeetingType[])}
              onChange={(e) => {
                const selected = e.target.value as string[];
                if (selected.includes("None")) {
                  handleChange(key as keyof MeetingPreferences, "None");
                } else {
                  handleChange(
                    key as keyof MeetingPreferences,
                    selected as MeetingType[]
                  );
                }
              }}
              input={
                <OutlinedInput
                  label={
                    MeetingPreferenceDisplayNames[
                      key as keyof MeetingPreferences
                    ]
                  }
                />
              }
              renderValue={(selected) => {
                if (!selected.length) {
                  return (
                    <Typography variant="body2" color="text.secondary">
                      None
                    </Typography>
                  );
                }

                return (
                  <Box>
                    {selected.map((val, idx) => (
                      <span key={val} className="text-sm">
                        {val.charAt(0).toUpperCase() + val.slice(1)}
                        {idx < selected.length - 1 && ", "}
                      </span>
                    ))}
                  </Box>
                );
              }}
              MenuProps={MenuProps}
            >
              <MenuItem value="None">
                <span className="text-sm">None</span>
              </MenuItem>
              {meetingTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  <span className="text-sm">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      ))}
    </main>
  );
}
