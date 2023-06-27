import Modal from "../UI/Modal/Modal.jsx";

const GameEndModal = (props) => {

    const closeModal = () => {
        props.closeModal()
    }

    return (
        <Modal showIcon={false} closeModal={closeModal}>
            {props.content}
        </Modal>
    )
}

export default GameEndModal