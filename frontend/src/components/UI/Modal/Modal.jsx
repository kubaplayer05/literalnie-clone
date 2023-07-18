import closeIcon from "../../../assets/close.png"
import style from "./Modal.module.css"

const Modal = props => {

    let showIcon = true

    if (props.showIcon === false) {
        showIcon = false
    }

    const closeModal = () => {
        props.closeModal()
    }

    const animationEndHandler = e => {
        const {animationEndHandler} = props

        animationEndHandler ? animationEndHandler(e) : ""
    }

    return (
        <div onAnimationEnd={animationEndHandler} className={`${style.modal} ${props.className}`}>
            {showIcon && <img onClick={closeModal} className={style.close} alt="close icon" src={closeIcon}/>}
            {props.children}
        </div>
    )
}

export default Modal