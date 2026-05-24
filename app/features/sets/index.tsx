import { gql, type TypedDocumentNode } from "@apollo/client/core/index.js";
import { useQuery } from "@apollo/client/react";

import { apolloLoader } from "~/utils/apollo";
import type { MGSectionedSets, MGSet } from "~/types";
import type { Route } from "./+types";
import { 
  SectionedSets_FRAGMENT,
  SetInfo_FRAGMENT,
  SetBasicInfo_FRAGMENT,  
} from "~/utils/fragments";
import SetsListPage from "./components/SetsList";
import Spinner from "~/components/Spinner";

const GET_SETS: TypedDocumentNode<MGSectionedSets> = gql`
  query SetsByYear {
    setsByYear {
      ...SectionedSets
    }
  }
  ${SectionedSets_FRAGMENT},
  ${SetInfo_FRAGMENT},
  ${SetBasicInfo_FRAGMENT},
`;

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