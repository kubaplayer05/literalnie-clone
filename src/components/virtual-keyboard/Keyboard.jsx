import Key from "./Key.jsx";

import style from "./Keyboard.module.css"

const Keyboard = props => {

    const keyboardScheme = [
        ["ą", "ć", "ę", "ł", "ó", "ś", "ń", "ż", "ź"],
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["enter", "z", "x", "c", "v", "b", "n", "m", "<-"]
    ]

    const enteredValueHandler = value => {
        props.enteredValueHandler(value)
    }

    return (
        <div className={style.keyboard}>
            {keyboardScheme.map((row, index) => {
                return <div key={index} className={style.row}>
                    {row.map((letter, index) => {
                        return <Key enteredValueHandler={enteredValueHandler} key={index} letter={letter}/>
                    })}
                </div>
            })}
        </div>
    )
}

export default Keyboard
