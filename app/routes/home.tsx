import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mana Probe" },
    { name: "description", content: "Welcome to Mana Probe!" },
  ];
}

export default function Home() {
  // return <Welcome />;
  return <>Welcome to Mana Probe!</>
}
