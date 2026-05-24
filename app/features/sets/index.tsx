import { gql, type TypedDocumentNode } from "@apollo/client/core/index.js";
import { apolloLoader } from "~/utils/apollo";
import { useReadQuery } from "@apollo/client/react/compiled";
import { Suspense } from "react";
import { useLoaderData } from "react-router";

import type { Route } from "./+types";
import { 
  FRAGMENTS,
  SectionedSets_FRAGMENT,
  SetInfo_FRAGMENT,
  SetBasicInfo_FRAGMENT,  
} from "~/utils/fragments";
import SetsListPage from "./components/SetsList";
import type { MGSectionedSets, MGSet } from "~/types";

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
  const { setsQueryRef } = useLoaderData<typeof loader>();
  const { data } = useReadQuery(setsQueryRef);
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