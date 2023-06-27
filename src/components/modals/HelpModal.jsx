import Modal from "../UI/Modal/Modal.jsx";

const HelpModal = props => {

    const closeHelpModal = () => {
        props.closeHelpModal()
    }

    return (
        <Modal closeModal={closeHelpModal}>
            <h2>Jak Grać?</h2>
            <p>Zgadnij 5 literowe słowo w 6 próbach</p>
            <ul>
                <li>Każde słowo musi się składać z 5 liter</li>
                <li>Kolor pola zmienia się w zależności od występowania litery w słowie </li>
            </ul>
        </Modal>
    )
}

export default HelpModal