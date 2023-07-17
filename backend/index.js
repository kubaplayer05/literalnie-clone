import express from "express"
import {getRandomWord} from "./handlers/words.js";
import {checkIfExist} from "./handlers/words.js";

const app = express()
const port = 3000

app.get("/", (req, res) => {

    try {
        const word = getRandomWord(5)
        res.send({
            status: 200,
            value: word,
        })
    } catch {
        res.send({
            status: 500,
            value: "Something went wrong!",
        })
    }

})

app.get("/check/:word", (req, res) => {

    try {
        const word = req.params.word
        const existing = checkIfExist(word, 5)

        res.send({
            status: 200,
            value: existing,
            word: word,
        })
    } catch {
        res.send({
            status: 500,
            value: "Something went wrong!",
        })
    }
})

app.listen(port)
console.log(`Server just started on port ${port}!`)