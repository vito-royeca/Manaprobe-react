import { gql, type TypedDocumentNode } from "@apollo/client/core/index.js";

import type { MGCards } from "~/types";
import { 
  CardBasicInfo_FRAGMENT,
  ColorInfo_FRAGMENT,
  InnerCardInfo_FRAGMENT,

} from '~/utils/fragments';

export const SEARCH: TypedDocumentNode<MGCards> = gql`
  query Search($query: String!) {
    search(query: $query) {
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
