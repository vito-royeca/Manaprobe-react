export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export const FEATURES: FeatureItem[] = [
  {
    id: "life-counter",
    title: "Life Counter Tracking",
    description:
      "Track life totals for all players with intuitive tap-to-adjust controls. Supports starting life totals for Standard, Modern, Commander, and custom formats.",
    icon: "❤️",
  },
  {
    id: "multiplayer",
    title: "Multiplayer Support",
    description:
      "Play with 2 to 6 players simultaneously. Each player gets their own life counter panel with customizable colors and layouts.",
    icon: "👥",
  },
  {
    id: "commander-damage",
    title: "Commander Damage Tracking",
    description:
      "Keep track of commander damage from each opponent separately. Automatically alerts when a player reaches the 21 damage threshold.",
    icon: "⚔️",
  },
  {
    id: "game-history",
    title: "Game History",
    description:
      "Review past games with a detailed log of life total changes. Undo accidental taps and replay key moments from your matches.",
    icon: "📜",
  },
  {
    id: "poison-counters",
    title: "Poison Counters",
    description:
      "Track infect damage with dedicated poison counters for each player. Visual warnings as players approach the 10-counter lethal threshold.",
    icon: "☠️",
  },
  {
    id: "dice-roller",
    title: "Dice Roller",
    description:
      "Roll dice directly in the app for coin flips, D6, D20, and custom-sided dice. Perfect for resolving game effects without physical dice.",
    icon: "🎲",
  },
  {
    id: "themes",
    title: "Customizable Themes",
    description:
      "Personalize your experience with multiple color themes and backgrounds. Choose from dark, light, and mana-colored themes to match your style.",
    icon: "🎨",
  },
  {
    id: "timer",
    title: "Timer & Turn Tracking",
    description:
      "Built-in round timer for timed events and turn tracking to keep games moving. Configurable alerts ensure you never go to time unexpectedly.",
    icon: "⏱️",
  },
];
