import {useContext} from "react";
import {GameContext} from "../../../store/gameContext.jsx";
import Modal from "../../UI/Modal/Modal.jsx";
import Button from "../../UI/Button/Button.jsx";

import styles from "./GameEndModal.module.css"

const GameEndModal = ({closeModal, restartGame, word, isWon}) => {

    let content = <>
        <h2>Wygrałeś</h2>
        <p>Odgadnięte słowo to</p>
        <h3>{word}</h3>
    </>

    if (!isWon) {
        content = <>
            <h2>Przegrałeś</h2>
            <p>Tajemnicze słowo to</p>
            <h3>{word}</h3>
        </>
    }

    const restartGameHandler = () => {
        restartGame()
        closeModal()
    }

    return (
        <Modal className={styles.content} showIcon={false} closeModal={closeModal}>
            {content}
            <div className={styles.btnContainer}>
                <Button onClick={restartGameHandler}>Jeszcze raz!</Button>
                <Button onClick={closeModal}>Zamknij</Button>
            </div>
        </Modal>
    )
}

export default GameEndModal