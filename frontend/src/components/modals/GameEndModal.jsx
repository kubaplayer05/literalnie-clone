import Modal from "../UI/Modal/Modal.jsx";

const GameEndModal = ({closeModal, word, isWon}) => {

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

    return (
        <Modal showIcon={false} closeModal={closeModal}>
            {content}
        </Modal>
    )
}

export default GameEndModal