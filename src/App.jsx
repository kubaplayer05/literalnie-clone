import {useState} from "react";
import Keyboard from "./components/virtual-keyboard/Keyboard.jsx";
import "./App.css"
import Word from "./components/word/Word.jsx";

const App = () => {

    const [structure, updateStructure] = useState([
        {
            id: 0,
            isLocked: false,
            fields: [{value: "", status: "unchecked"}, {value: "", status: "unchecked"}, {
                value: "",
                status: "unchecked"
            }, {value: "", status: "unchecked"}, {value: "", status: "unchecked"}]
        },
        {
            id: 1,
            isLocked: false,
            fields: [{value: "", status: "unchecked"}, {value: "", status: "unchecked"}, {
                value: "",
                status: "unchecked"
            }, {value: "", status: "unchecked"}, {value: "", status: "unchecked"}]
        },
        {
            id: 2,
            isLocked: false,
            fields: [{value: "", status: "unchecked"}, {value: "", status: "unchecked"}, {
                value: "",
                status: "unchecked"
            }, {value: "", status: "unchecked"}, {value: "", status: "unchecked"}]
        },
        {
            id: 3,
            isLocked: false,
            fields: [{value: "", status: "unchecked"}, {value: "", status: "unchecked"}, {
                value: "",
                status: "unchecked"
            }, {value: "", status: "unchecked"}, {value: "", status: "unchecked"}]
        },
        {
            id: 4,
            isLocked: false,
            fields: [{value: "", status: "unchecked"}, {value: "", status: "unchecked"}, {
                value: "",
                status: "unchecked"
            }, {value: "", status: "unchecked"}, {value: "", status: "unchecked"}]
        },
        {
            id: 5,
            isLocked: false,
            fields: [{value: "", status: "unchecked"}, {value: "", status: "unchecked"}, {
                value: "",
                status: "unchecked"
            }, {value: "", status: "unchecked"}, {value: "", status: "unchecked"}]
        }
    ])
    const [letterIndex, setLetterIndex] = useState(0)
    const DUMMY_TEXT = "tekst".toUpperCase()
    let activeRow = null

    const winGame = () => {
        console.log("You won the game")
    }

    const loseGame = () => {
        console.log("Game Over!")
    }

    const enteredValueHandler = letter => {

        for (let i = 0; i < structure.length; i++) {
            if (!structure[i].isLocked) {
                activeRow = structure[i]
                break
            }
        }

        if(!activeRow) loseGame()

        switch (letter) {
            case "ENTER":
                console.log(`letterIndex: ${letterIndex}, length: ${activeRow.fields.length}`)
                if (letterIndex === activeRow.fields.length) {
                    activeRow.isLocked = true
                    let userWord = ""
                    activeRow.fields.forEach((field, index) => {
                        userWord += field.value
                        if (field.value === DUMMY_TEXT[index]) {
                            field.status = "perfect"
                        } else if (DUMMY_TEXT.includes(field.value)) {
                            field.status = "good"
                        } else {
                            field.status = "wrong"
                        }

                        if (userWord === DUMMY_TEXT) winGame()
                    })
                    setLetterIndex(0)
                } else {
                    console.log("You must provide all fields in the row")
                }
                break
            case "<-":
                activeRow.fields[letterIndex - 1].value = ""
                setLetterIndex(prevIndex => prevIndex - 1)
                break
            default:
                activeRow.fields[letterIndex].value = letter
                if (letterIndex < activeRow.fields.length) {
                    setLetterIndex(prevIndex => prevIndex + 1)
                }
        }

        updateStructure(prevState => {
            return prevState.map((row) => {
                if (row.id === activeRow.id) {
                    return activeRow
                } else return row
            })
        })
    }

    return (
        <>
            <Word structure={structure}/>
            <Keyboard enteredValueHandler={enteredValueHandler}/>
        </>
    )
}

export default App
