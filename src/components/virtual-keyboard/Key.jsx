import Button from "../UI/Button.jsx";
import style from "./Key.module.css"

const Key = props => {

    // eslint-disable-next-line react/prop-types
    const letter = props.letter.toUpperCase()

    const keyHandler = () => {
        console.log(`Pressed Key: ${letter}`)
    }

    return (
        <Button onClick={keyHandler} className={style.key}>{letter}</Button>
    )
}

export default Key