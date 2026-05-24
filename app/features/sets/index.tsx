import { useQuery } from "@apollo/client/react";

import { apolloLoader } from "~/utils/apollo";
import { GET_SETS } from "./query";
import type { MGSet } from "~/types";
import type { Route } from "./+types";
import SetsListPage from "./components/SetsList";
import Spinner from "~/components/Spinner";

export const loader = apolloLoader<Route.LoaderArgs>()(({ preloadQuery }) => {
  const setsQueryRef = preloadQuery(GET_SETS);
  return {
    setsQueryRef,
  };
});

function SetsPage() {
  const { loading, error, data } = useQuery(GET_SETS);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  let sets: MGSet[] = [];

  if (data !== undefined) {
    for (const sectionedSet of data.setsByYear.sectionedSets) {
      sets.push(...sectionedSet.sets);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Sets</h1>
      <SetsListPage sets={sets} />
    </div>
  );
}

export default SetsPage;