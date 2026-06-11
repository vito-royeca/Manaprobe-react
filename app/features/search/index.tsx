import { useQuery } from "@apollo/client/react";
import { 
  Alert,
  AlertTitle,
  Box,
  CircularProgress 
} from "@mui/material";
import { useParams } from "react-router";

import { SEARCH } from "./query";
import SearchCardsList from "./components/SearchCardsList";
import SearchHeader from "./components/SearchHeader";

const SearchPage = () => {
  const { query } = useParams<{ query: string }>();
  
  const { loading, error, data } = useQuery(SEARCH, {
    variables: {
      input: {
        query: query,
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
    <div>
      {data && (
        <SearchHeader count={data.length}/>
      )}
      <div  className="mb-4" />
      {data && (
        <SearchCardsList cards={data} />
      )}
    </div>
  );
}
 
export default SearchPage;