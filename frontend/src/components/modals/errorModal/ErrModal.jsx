import Modal from "../../UI/Modal/Modal.jsx";

import styles from "./ErrModal.module.css"
import close from "../../../assets/close.png"
import {useState} from "react";

const ErrModal = props => {

    const timeout = props.timeout || 3000
    const [animationTime, setAnimationTime] = useState(timeout / 1000)

    const [modalClassName, setModalClassName] = useState(`${styles.errorModal}`)

    setTimeout(() => {
        closeAnimationHandler()
    }, timeout)

    const closeModal = () => {
        props.closeModal()
    }

    const closeAnimationHandler = () => {
        setModalClassName(`${styles.errorModal} ${styles.turnOff}`)
    }

    const animationEndHandler = e => {
        if (e.animationName.includes("turn-off")) {
            setModalClassName(`${styles.errorModal}`)
            closeModal()
        }
    }

    return (
        <Modal animationEndHandler={animationEndHandler} showIcon={false} className={modalClassName}>
            <div className={styles.modalContainer}>
                <p className={styles.content}>{props.content}</p>
                <div className={styles.closeContainer}>
                    <img onClick={closeAnimationHandler} src={close} alt=""/>
                </div>
            </div>
        </Modal>
    )
}

export default ErrModal