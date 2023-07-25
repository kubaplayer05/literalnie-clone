import {GameProvider} from "./store/gameContext.jsx";
import Keyboard from "./components/virtual-keyboard/Keyboard/Keyboard.jsx";
import Word from "./components/word/Word.jsx";
import Header from "./components/header/Header.jsx";

import "./App.css"

const App = () => {

    return (
        <>
            <Header/>
            <GameProvider>
                <Word/>
                <Keyboard/>
            </GameProvider>
        </>
    )
}

export default App
