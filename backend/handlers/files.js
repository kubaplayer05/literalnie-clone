import fs from "fs"

const wordsArray = []
let content = ""

export const writeWordsToFile = length => {

    const fileContent = fs.readFileSync("./data/slowa.txt", 'utf-8');

    fileContent.split(/\r?\n/).forEach(line => {
        if (line.trim().length === length) {
            wordsArray.push(line)
        }
    });

    wordsArray.forEach(word => {
        content += `${word}\n`
    })

    try {
        fs.writeFileSync(`./data/slowa${length}.txt`, content);
        console.log(`Successfully write words to slowa${length}.txt`)
    } catch (err) {
        console.error(err);
    }

}

export const getWordsArray = length => {

    const wordsArray = []

    const fileContent = fs.readFileSync(`./data/slowa${length}.txt`, "utf-8")
    fileContent.split(/\r?\n/).forEach(line => {
        wordsArray.push(line)
    });

    return wordsArray
}

