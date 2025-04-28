"use client";

import {
  MeetingPreferences,
  MeetingPreferenceDisplayNames,
} from "@/type/preferences/MeetingPreferences";
import { MeetingType } from "@/type/meeting";

import { useTheme } from "@mui/material/styles";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
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
};

// Your possible meeting types
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
  const theme = useTheme();

  return (
    <main className="p-6 max-w-2xl mx-auto">
      {Object.entries(prefs).map(([key, value]) => (
        <div key={key} className="mb-6">
          <FormControl sx={{ width: "100%" }}>
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
                  // If "None" is selected, clear all others
                  handleChange(key as keyof MeetingPreferences, "None");
                } else {
                  // Otherwise, save the selected types
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
                    <Chip
                      label="None"
                      sx={{
                        fontSize: "0.75rem",
                        backgroundColor: "#f0f0f0",
                        color: "#555",
                      }}
                    />
                  );
                }

                return (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((val) => (
                      <Chip
                        key={val}
                        label={
                          <span className="text-sm">
                            {val.charAt(0).toUpperCase() + val.slice(1)}
                          </span>
                        }
                      />
                    ))}
                  </Box>
                );
              }}
              MenuProps={{
                ...MenuProps,
                disablePortal: true, // ✅ <- Add this
              }}
            >
              <MenuItem value="None">
                <span className="text-sm">None</span>
              </MenuItem>
              {meetingTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  <span className="text-sm">
                    {" "}
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
