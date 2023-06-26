import style from "./Modal.module.css"

const Modal = props => {

    return (
        <div className={`${style.modal} ${props.className}`}>{props.children}</div>
    )
}

export default Modal