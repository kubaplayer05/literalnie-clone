import {getWordsArray} from "./files.js";

export const getRandomWord = length => {

    const wordsArray = getWordsArray(length)
    const randomIndex = Math.round(Math.random() * wordsArray.length) - 1

    return wordsArray[randomIndex]
}

export const checkIfExist = (word, length) => {

    const wordsArray = getWordsArray(length)
    return wordsArray.includes(word);
}