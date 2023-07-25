import closeIcon from "../../../assets/close.png"
import style from "./Modal.module.css"
import {useState} from "react";

const Modal = props => {

    const [className, setClassName] = useState(`${style.modal} ${props.className}`);

    let showIcon = true

    if (props.showIcon === false) {
        showIcon = false
    }

    const closeModal = () => {
        setClassName(`${style.modal} ${style.turnOff} ${props.className}`)
    }

    const animationEndHandler = e => {
        const {animationEndHandler} = props

        if (e.animationName.includes("turn-off")) {
            props.closeModal()
        }

        animationEndHandler ? animationEndHandler(e) : ""
    }

    return (
        <div onAnimationEnd={animationEndHandler} className={className}>
            {showIcon && <img onClick={closeModal} className={style.close} alt="close icon" src={closeIcon}/>}
            {props.children}
        </div>
    )
}

export default Modal