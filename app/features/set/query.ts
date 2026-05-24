import { gql, type TypedDocumentNode } from "@apollo/client/core/index.js";

import { 
  CardBasicInfo_FRAGMENT,
  ColorInfo_FRAGMENT,
  InnerCardInfo_FRAGMENT,
  SetBasicInfo_FRAGMENT,
  SetInfo_FRAGMENT,
} from '~/utils/fragments';
import type { MGSet } from '~/types';

export const GET_SET: TypedDocumentNode<MGSet> = gql`
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
