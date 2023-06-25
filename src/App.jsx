import {useState} from "react";
import Keyboard from "./components/virtual-keyboard/Keyboard.jsx";
import "./App.css"
import Word from "./components/word/Word.jsx";

const App = () => {

    const [letter, changeLetter] = useState("")

    const forwardValue = value => {
        changeLetter(() => {
            return value
        })
    }

    return (
        <>
            <Word letter={letter}/>
            <Keyboard enteredValueHandler={forwardValue}/>
        </>
    )
}

export default App
