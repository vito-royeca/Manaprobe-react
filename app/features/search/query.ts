import { gql, type TypedDocumentNode } from "@apollo/client/core/index.js";

import type { MGCards } from "~/types";
import { 
  CardBasicInfo_FRAGMENT,
  ColorInfo_FRAGMENT,
  InnerCardInfo_FRAGMENT,

} from '~/utils/fragments';

export const SEARCH: TypedDocumentNode<MGCards> = gql`
  query CardsSearch($query: String!) {
    cardsSearch(query: $query) {
      count
      cards {
        ...CardBasicInfo
      }
    }
  }
  ${InnerCardInfo_FRAGMENT}
  ${CardBasicInfo_FRAGMENT}
  ${ColorInfo_FRAGMENT}
`;
