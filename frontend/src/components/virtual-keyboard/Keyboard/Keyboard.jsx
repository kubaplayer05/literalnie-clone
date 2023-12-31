import Key from "../Key/Key.jsx";

import style from "./Keyboard.module.css"

const Keyboard = () => {

    const keyboardScheme = [
        ["ą", "ć", "ę", "ł", "ó", "ś", "ń", "ż", "ź"],
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["enter", "z", "x", "c", "v", "b", "n", "m", "<-"]
    ]

    return (
        <div className={style.keyboard}>
            {keyboardScheme.map((row, index) => {
                return <div key={index} className={style.row}>
                    {row.map((letter, index) => {
                        return <Key key={index} letter={letter}/>
                    })}
                </div>
            })}
        </div>
    )
}

export default Keyboard
