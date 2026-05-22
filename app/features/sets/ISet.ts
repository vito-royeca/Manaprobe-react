export interface ISet {
    bigLogoURL: string | undefined
    cardCount: number | undefined
    code: string
    isFoilOnly: boolean
    isOnlineOnly: boolean
    keyruneUnicode: string
    keyruneClass: string
    logoCode: string | undefined
    mtgoCode: string | undefined
    name: string
    releaseDate: string
    smallLogoURL: string | undefined
    tcgplayerId: number
    yearSection: string
    // cards: [MGCard!]!
    // children: [MGSet!]!
    // setParent: MGSet
    // setBlock: MGSetBlock
    // setType: MGSetType!
    // languages: [MGLanguage!]!
}