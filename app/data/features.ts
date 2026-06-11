export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export const FEATURES: FeatureItem[] = [
  {
    id: "life-tracking",
    title: "Life Tracking",
    description:
      "Quickly adjust life totals with intuitive tap controls. Supports starting life totals for any format.",
    icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
  },
  {
    id: "game-state",
    title: "Game State",
    description:
      "Track commander damage, poison counters, energy, and more. Never lose track of complex board states.",
    icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
  },
  {
    id: "ms",
    title: "Multiplayer Support",
    description:
      "Support for 2-6 players with customizable layouts. Perfect for Commander, Two-Headed Giant, and more.",
    icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
  },
  {
    id: "clean-design",
    title: "Clean Design",
    description:
      "A beautiful, distraction-free interface that lets you focus on the game. Dark mode included.",
    icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
  },
];

export const ADDITIONAL_FEATURES: FeatureItem[] = [
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
