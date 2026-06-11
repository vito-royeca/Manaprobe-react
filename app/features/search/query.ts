import { gql, type TypedDocumentNode } from "@apollo/client/core/index.js";

import type { MGCard } from "~/types";
import { 
  CardBasicInfo_FRAGMENT,
  ColorInfo_FRAGMENT,
  InnerCardInfo_FRAGMENT,

} from '~/utils/fragments';

export const SEARCH: TypedDocumentNode<MGCard[]> = gql`
  query Search($query: String!) {
    search(query: $query) {
      ...CardBasicInfo
    }
  }
  ${InnerCardInfo_FRAGMENT}
  ${CardBasicInfo_FRAGMENT}
  ${ColorInfo_FRAGMENT}
`;
