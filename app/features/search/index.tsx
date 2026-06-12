import { useQuery } from "@apollo/client/react";
import { 
  Alert,
  AlertTitle,
  Box,
  CircularProgress 
} from "@mui/material";
import { useSearchParams } from "react-router";

import { SEARCH } from "./query";
import SearchCardsList from "./components/SearchCardsList";
import SearchHeader from "./components/SearchHeader";

const SearchPage = () => {
  const [searchParams, _] = useSearchParams();
  const query = searchParams.get("query") || "";

  const { loading, error, data } = useQuery(SEARCH, {
    variables: {
      query: query,
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
        <SearchHeader count={data.search.count}/>
      )}
      <div  className="mb-4" />
      {data && (
        <SearchCardsList cards={data.search.cards} />
      )}
    </div>
  );
}
 
export default SearchPage;