
import { gql, type TypedDocumentNode } from "@apollo/client/core/index.js";
import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router";

import type { MGSet } from '~/types';
import SetCardsList from "./components/SetCardsList";
import SetHeader from "./components/SetHeader";

import { 
  CardBasicInfo_FRAGMENT,
  ColorInfo_FRAGMENT,
  InnerCardInfo_FRAGMENT,
  SetBasicInfo_FRAGMENT,
  SetInfo_FRAGMENT,
} from '~/utils/fragments';

const GET_SET: TypedDocumentNode<MGSet> = gql`
  query Set($input: SetByIDInput!) {
    set(input: $input) {
      ...SetInfo
      cards {
        ...CardBasicInfo
      }
    }
  }
  ${InnerCardInfo_FRAGMENT}
  ${CardBasicInfo_FRAGMENT}
  ${ColorInfo_FRAGMENT}
  ${SetBasicInfo_FRAGMENT}
  ${SetInfo_FRAGMENT}
`;

const SetPage = () => {
  const { id } = useParams<{ id: string }>();
  const { lang } = useParams<{ lang: string }>();
  
  const { loading, error, data } = useQuery(GET_SET, {
    variables: {
      input: {
        setID: id,
        languageID: lang,
      },
    },
  });
   
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error.message}</p>;
   
  return (
    <>
      {data && (
        <SetHeader set={data.set} />
      )}
      {data?.set?.cards && (
        <SetCardsList cards={data.set.cards} />
      )}
    </>
  );
}
 
export default SetPage;