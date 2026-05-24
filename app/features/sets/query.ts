import { gql, type TypedDocumentNode } from "@apollo/client/core/index.js";

import type { MGSectionedSets } from "~/types";
import { 
  SectionedSets_FRAGMENT,
  SetInfo_FRAGMENT,
  SetBasicInfo_FRAGMENT,  
} from "~/utils/fragments";

export const GET_SETS: TypedDocumentNode<MGSectionedSets> = gql`
  query SetsByYear {
    setsByYear {
      ...SectionedSets
    }
  }
  ${SectionedSets_FRAGMENT},
  ${SetInfo_FRAGMENT},
  ${SetBasicInfo_FRAGMENT},
`;