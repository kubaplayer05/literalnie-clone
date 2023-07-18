import {createPortal} from "react-dom";
import {createContext, useEffect, useState} from "react";
import useStats from "../hooks/useStats.jsx";
import GameEndModal from "../components/modals/GameEndModal.jsx";
import Backdrop from "../components/UI/Backdrop/Backdrop.jsx";
import ErrModal from "../components/modals/errorModal/ErrModal.jsx";

export const GameContext = createContext(null)

// eslint-disable-next-line react/prop-types
export const GameProvider = ({children}) => {

    const baseUrl = "http://localhost:3000/"
    const options = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    }

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
    const [word, setWord] = useState("")

    const wins = useStats("wins")
    const gamesPlayed = useStats("games")
    const winStreak = useStats("winStreak")
    const [tries, setTries] = useState(1)

    const [letterIndex, setLetterIndex] = useState(0)
    let activeRow = null

    const [showModal, setShowModal] = useState(false)
    const [isWon, setIsWon] = useState(false)

    const [showError, setShowError] = useState(false)
    const [error, setError] = useState("")

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

                    let userWord = ""

                    activeRow.fields.forEach((field) => {
                        userWord += field.value
                    })

                    checkIfWordExist(userWord).then(exist => {
                        if (exist) {
                            userWord = ""

                            activeRow.isLocked = true
                            activeRow.fields.forEach((field, index) => {
                                userWord += field.value
                                if (field.value === word[index]) {
                                    field.status = "perfect"
                                } else if (word.includes(field.value)) {
                                    field.status = "good"
                                } else {
                                    field.status = "wrong"
                                }

                                if (userWord === word) {
                                    winGame()
                                }
                            })
                            setLetterIndex(0)
                        } else {
                            setError("Podane słowo nie znajduje się w bazie.")
                            setShowError(true)
                        }
                    })
                        .catch(err => {
                            console.error(err)
                        })


                } else {
                    setError("Wyraz musi się składać z 5 liter.")
                    setShowError(true)
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

    const checkIfWordExist = async word => {

        const url = baseUrl + `check/${word}`

        const response = await fetch(url, options)
        if (response.status !== 200) {
            throw new Error("Can`t check if the word exist.")
        }

        const data = await response.json()
        console.log(data)

        return data.value
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const closeErrModal = () => {
        setShowError(false)
    }


    useEffect(() => {

        const url = baseUrl + "word"

        const getRandomWord = async () => {

            const response = await fetch(url, options)
            if (response.status !== 200) {
                throw new Error("Can`t get a random word.")
            }

            const data = await response.json()

            setWord(data.value.toUpperCase())
        }

        getRandomWord()
            .catch(err => {
                console.error(err)
            })

    }, [])

    return (
        <>
            <GameContext.Provider value={{
                structure,
                setStructure,
                word: word,
                keyHandler
            }}>
                {children}
            </GameContext.Provider>
            {showModal && createPortal(<GameEndModal closeModal={closeModal} isWon={isWon}
                                                     word={word}/>, document.querySelector("#modal-root"))}
            {showModal && createPortal(<Backdrop/>, document.querySelector("#modal-root"))}
            {showError && createPortal(<ErrModal content={error}
                                                 closeModal={closeErrModal}/>, document.querySelector("#modal-root"))}
        </>
    )
}

