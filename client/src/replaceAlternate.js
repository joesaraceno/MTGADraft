import { replaceCardKey } from "./helper";

export function replaceAlternateArtCards(cardsListJson, replacementMap) {
    // check each key in the cardsList against the replacementMap (list of key value pairs with old and new key)
    for (let cardId of Object.keys(cardsListJson)) {
        if (typeof replacementMap[cardId] !== 'undefined') {
            cardsListJson = replaceCardKey(
                cardsListJson, 
                { oldKey: cardId, newKey: replacementMap[cardId] }
            );
        }
    }
    return cardsListJson;
}
