import closeIcon from "../../../assets/close.png"
import style from "./Modal.module.css"
import backdropStyles from "../Backdrop/Backdrop.module.css"
import {useState} from "react";

const Modal = props => {

    const [modalClassName, setClassName] = useState(`${style.modal}`);
    let showIcon = true

    if (props.showIcon === false) {
        showIcon = false
    }

    const closeModal = () => {
        const container = document.getElementById("modal-root");
        const allDivs = container.querySelectorAll("div");
        const backdrop = allDivs[allDivs.length - 1];
        backdrop.classList.add(`${backdropStyles.turnOff}`)
        setClassName(`${style.modal} ${style.turnOff}`)
    }

    const animationEndHandler = e => {
        const {animationEndHandler} = props

        if (e.animationName.includes("turn-off") && !animationEndHandler) {
            props.closeModal()
        } else {
            animationEndHandler ? animationEndHandler(e) : ""
        }
    }

    return (
        <div onAnimationEnd={animationEndHandler} className={`${modalClassName} ${props.className}`}>
            {showIcon && <img onClick={closeModal} className={style.close} alt="close icon" src={closeIcon}/>}
            {props.children}
        </div>
    )
}

export default Modal