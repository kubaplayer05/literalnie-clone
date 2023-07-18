import {useContext} from "react";
import {GameContext} from "../../../store/gameContext.jsx";
import Button from "../../UI/Button/Button.jsx";

import style from "./Key.module.css"

const Key = props => {

    const {keyHandler} = useContext(GameContext)

    // eslint-disable-next-line react/prop-types
    const letter = props.letter.toUpperCase()

    const clickHandler = () => {
        keyHandler(letter)
    }

    return (
        <Button onClick={clickHandler} className={style.key}>{letter}</Button>
    )
}

export default Key