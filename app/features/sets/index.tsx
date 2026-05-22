import { gql, type TypedDocumentNode } from "@apollo/client/core/index.js";
import { apolloLoader } from "~/utils/apollo";
import { useReadQuery } from "@apollo/client/react/compiled";
import { useLoaderData } from "react-router";

import type { Route } from "./+types";
import { FRAGMENTS } from "~/utils/Fragments";
import SetsListPage from "./components/SetsList";

const GET_SETS: TypedDocumentNode<
  { setsByYear: { sectionedSets: {
      [x: string]: any; section: number, sets: [{ id: string; name: string; }] 
} } }
> = gql`
  query SetsByYear {
    setsByYear {
      ...SectionedSets
    }
  }
  ${FRAGMENTS}
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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Sets</h1>
      <p className="text-lg text-gray-700">
        Explore the various sets of Magic: The Gathering, including their release dates, themes, and card lists.
      </p>
        
      {data.setsByYear.sectionedSets.map((sectionedSet: any) => (
        <div key={sectionedSet.section} className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">
                {sectionedSet.section}
            </h2>
            <SetsListPage sets={sectionedSet.sets} />
        </div>
      ))}
    </div>
  );
}

export default SetsPage;