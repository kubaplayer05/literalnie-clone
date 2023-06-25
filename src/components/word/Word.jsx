import {useState, useEffect} from "react";
import Field from "./Field.jsx";
import style from "./Word.module.css"

const Word = ({letter}) => {

    const [letterIndex, setLetterIndex] = useState(0)
    const DUMMY_TEXT = "tekst"
    let activeRow


    const [structure, updateStructure] = useState([
        {
            id: 0,
            isLocked: false,
            fields: ["", "", "", "", ""]
        },
        {
            id: 1,
            isLocked: false,
            fields: ["", "", "", "", ""]
        },
        {
            id: 2,
            isLocked: false,
            fields: ["", "", "", "", ""]
        },
        {
            id: 3,
            isLocked: false,
            fields: ["", "", "", "", ""]
        },
        {
            id: 4,
            isLocked: false,
            fields: ["", "", "", "", ""]
        },
        {
            id: 5,
            isLocked: false,
            fields: ["", "", "", "", ""]
        }
    ])


    for (let i = 0; i < structure.length; i++) {
        if (!structure[i].isLocked) {
            activeRow = structure[i]
            break
        }
    }

    useEffect(() => {

        switch (letter) {
            case "":
                break
            case "ENTER":

                break
            case "<-":
                break
            default:
                activeRow.fields[letterIndex] = letter
                if (letterIndex < activeRow.fields.length - 1) {
                    setLetterIndex(prevIndex => prevIndex + 1)
                }
        }
        console.log(`letterIndex: ${letterIndex}`)
        console.log(structure)

        updateStructure(prevState => {
            return prevState.map((row) => {
                if (row.id === activeRow.id) {
                    return activeRow
                } else return row
            })
        })

    }, [letter])

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