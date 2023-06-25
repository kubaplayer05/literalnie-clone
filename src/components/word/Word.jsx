import {useState} from "react";

import Field from "./Field.jsx";
import style from "./Word.module.css"

const Word = () => {

    const [structure, updateStructure] = useState([
        {
            isLocked: false,
            fields: ["", "", "", "", ""]
        },
        {
            isLocked: false,
            fields: ["", "", "", "", ""]
        },
        {
            isLocked: false,
            fields: ["", "", "", "", ""]
        },
        {
            isLocked: false,
            fields: ["", "", "", "", ""]
        },
        {
            isLocked: false,
            fields: ["", "", "", "", ""]
        },
        {
            isLocked: false,
            fields: ["", "", "", "", ""]
        }
    ])

    return (
        <div className={style.container}>
            {structure.map((row, index) => {
                return <div key={index} className={style.row}>
                    {row.fields.map((field, index) => {
                        return <Field key={index} value={field}/>
                    })}
                </div>
            })}
        </div>
    )
}

export default Word