import { useQuery } from "@apollo/client/react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router";

import { GET_SET } from "./query";
import SetCardsList from "./components/SetCardsList";
import SetHeader from "./components/SetHeader";

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