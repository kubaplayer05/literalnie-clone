import {useContext} from "react";
import {GameContext} from "../../store/gameContext.jsx";
import Field from "./Field/Field.jsx";
import style from "./Word.module.css"

const Word = () => {

    const {structure} = useContext(GameContext)

    return (
        <div className={style.container}>
            {structure.map((row, index) => {
                return <div key={index} className={style.row}>
                    {row.fields.map((field, index) => {
                        return <Field key={index} value={field.value} status={field.status}/>
                    })}
                </div>
            })}
        </div>
    )
}

export default Word