import {useState, useEffect} from "react";
import Field from "./Field.jsx";
import style from "./Word.module.css"
import field from "./Field.jsx";

const Word = ({letter}) => {

    const [letterIndex, setLetterIndex] = useState(0)
    const DUMMY_TEXT = "tekst".toUpperCase()
    let activeRow


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
                if (letterIndex === activeRow.fields.length - 1) {
                    activeRow.isLocked = true
                    let userWord = ""
                    activeRow.fields.forEach((field, index) => {
                        userWord += field.value
                        if(field.value === DUMMY_TEXT[index]) {
                            field.status = "perfect"
                        } else if(DUMMY_TEXT.includes(field.value)) {
                            field.status = "good"
                        } else {
                            field.status = "wrong"
                        }

                        if(userWord === DUMMY_TEXT) winGame()
                    })
                    setLetterIndex(0)
                } else {
                    console.log("You must provide all fields in the row")
                }
                break
            case "<-":
                break
            default:
                activeRow.fields[letterIndex].value = letter
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

    const winGame = () => {
        console.log("You won the game")
    }

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