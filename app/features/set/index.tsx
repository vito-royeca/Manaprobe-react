import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router";

import { GET_SET } from "./query";
import SetCardsList from "./components/SetCardsList";
import SetHeader from "./components/SetHeader";
import Spinner from "~/components/Spinner";

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
   
  if (loading) return <Spinner />;
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