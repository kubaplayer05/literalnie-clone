import {createPortal} from "react-dom";
import {createContext, useState} from "react";
import useStats from "../hooks/useStats.jsx";
import GameEndModal from "../components/modals/GameEndModal.jsx";
import Backdrop from "../components/UI/Backdrop/Backdrop.jsx";

export const GameContext = createContext(null)

// eslint-disable-next-line react/prop-types
export const GameProvider = ({children}) => {

    const [structure, setStructure] = useState([
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
    const DUMMY_TEXT = "tekst".toUpperCase()

    const wins = useStats("wins")
    const gamesPlayed = useStats("games")
    const winStreak = useStats("winStreak")
    const [tries, setTries] = useState(1)

    const [letterIndex, setLetterIndex] = useState(0)
    let activeRow = null

    const [showModal, setShowModal] = useState(false)
    const [isWon, setIsWon] = useState(false)

    const keyHandler = value => {

        for (let i = 0; i < structure.length; i++) {
            if (!structure[i].isLocked) {
                activeRow = structure[i]
                break
            }
        }

        if (!activeRow) {
            loseGame()
            return
        }

        switch (value) {
            case "ENTER":
                if (letterIndex === activeRow.fields.length) {
                    activeRow.isLocked = true
                    let userWord = ""
                    activeRow.fields.forEach((field, index) => {
                        userWord += field.value
                        if (field.value === DUMMY_TEXT[index]) {
                            field.status = "perfect"
                        } else if (DUMMY_TEXT.includes(field.value)) {
                            field.status = "good"
                        } else {
                            field.status = "wrong"
                        }

                        if (userWord === DUMMY_TEXT) {
                            winGame()
                        }
                    })
                    setLetterIndex(0)
                } else {
                    console.log("You must provide all fields in the row")
                }
                break
            case "<-":
                activeRow.fields[letterIndex - 1].value = ""
                setLetterIndex(prevIndex => prevIndex - 1)
                break
            default:
                activeRow.fields[letterIndex].value = value
                if (letterIndex < activeRow.fields.length) {
                    setLetterIndex(prevIndex => prevIndex + 1)
                }
        }

        setStructure(prevState => {
            return prevState.map((row) => {
                if (row.id === activeRow.id) {
                    return activeRow
                } else return row
            })
        })
    }

    const winGame = () => {
        gamesPlayed.updateStorage(`${parseInt(gamesPlayed.value) + 1}`)
        gamesPlayed.updateValue(prevGames => {
            return parseInt(prevGames) + 1
        })

        wins.updateStorage(`${parseInt(wins.value) + 1}`)
        wins.updateValue(prevWins => {
            return parseInt(prevWins) + 1
        })

        winStreak.updateStorage(`${parseInt(winStreak.value) + 1}`)
        winStreak.updateValue(prevWinStreak => {
            return parseInt(prevWinStreak) + 1
        })

        setIsWon(true)
        setShowModal(true)
    }

    const loseGame = () => {
        gamesPlayed.updateStorage(`${parseInt(gamesPlayed.value) + 1}`)
        gamesPlayed.updateValue(prevGames => {
            return parseInt(prevGames) + 1
        })

        winStreak.updateStorage("0")
        winStreak.updateValue(0)

        setIsWon(false)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <GameContext.Provider value={{
                structure,
                setStructure,
                DUMMY_TEXT,
                keyHandler
            }}>
                {children}
            </GameContext.Provider>
            {showModal && createPortal(<GameEndModal closeModal={closeModal} isWon={isWon}
                                                     word={DUMMY_TEXT}/>, document.querySelector("#modal-root"))}
            {showModal && createPortal(<Backdrop/>, document.querySelector("#modal-root"))}
        </>
    )
}

