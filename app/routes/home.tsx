import { useState } from "react";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Search as SearchIcon } from "@mui/icons-material";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Manaprobe - A database of Magic: The Gathering Cards" },
    {
      name: "description",
      content:
        "Search and explore Magic: The Gathering cards, sets, and more.",
    },
  ];
}

function SearchForm() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <TextField
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for cards, sets, or keywords..."
        aria-label="Search Magic: The Gathering cards"
        variant="outlined"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" aria-label="Submit search" edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </form>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-3xl md:text-4xl md:text-4xl font-bold text-brand-dark mb-8 text-center lg:text-5xl">
        Manaprobe
      </h1>
      <p className="text-text-secondary text-center mb-8 max-w-lg">
        Search the complete Magic: The Gathering card database.
      </p>
      <SearchForm />
    </div>
  );
}
