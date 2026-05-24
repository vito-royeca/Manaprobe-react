import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "@apollo/client/react";

import { apolloLoader } from "~/utils/apollo";
import { GET_SETS } from "./query";
import type { MGSet } from "~/types";
import type { Route } from "./+types";
import SetsListPage from "./components/SetsList";

export const loader = apolloLoader<Route.LoaderArgs>()(({ preloadQuery }) => {
  const setsQueryRef = preloadQuery(GET_SETS);
  return {
    setsQueryRef,
  };
});

function SetsPage() {
  const { loading, error, data } = useQuery(GET_SETS);

  if (loading) return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress aria-label="Loading…" />
    </Box>
  );

  if (error) return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {error.message}
    </Alert>
  );

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