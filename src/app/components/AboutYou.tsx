"use client";

import {
  Typography,
  TextField,
  Stack,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { useUserDetails } from "../hooks/useUserDetails";

const pronounOptions = [
  "he/him",
  "she/her",
  "they/them",
  "he/they",
  "she/they",
  "Prefer not to say",
  "Other",
];

export default function AboutYou() {
  const { details, loading, handleChange } = useUserDetails();

  if (loading) {
    return <div className="p-8 text-center">Loading your details...</div>;
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <Stack spacing={3}>
        <Typography variant="h5">About You</Typography>

        <TextField
          select
          label="Pronouns"
          variant="outlined"
          fullWidth
          value={details.pronouns}
          onChange={(e) => handleChange("pronouns", e.target.value)}
          SelectProps={{ MenuProps: { disablePortal: true } }}
        >
          {pronounOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Bio"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={details.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
        />

        <TextField
          label="LinkedIn"
          variant="outlined"
          fullWidth
          value={details.linkedin}
          onChange={(e) => handleChange("linkedin", e.target.value)}
        />

        <TextField
          label="GitHub"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">@</InputAdornment>,
          }}
          value={details.github}
          onChange={(e) => handleChange("github", e.target.value)}
        />

        <TextField
          label="Instagram"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">@</InputAdornment>,
          }}
          value={details.instagram}
          onChange={(e) => handleChange("instagram", e.target.value)}
        />
      </Stack>
    </main>
  );
}
