import Modal from "../../UI/Modal/Modal.jsx";

import styles from "./StatsModal.module.css"

const StatsModal = props => {

    let wins = localStorage.getItem("wins") || 0
    let gamesPlayed = localStorage.getItem("games") || 0
    let winStreak = localStorage.getItem("winStreak") || 0

    const closeStatsModal = () => {
        props.closeStatsModal()
    }

    return (
        <Modal className={styles.modal} closeModal={closeStatsModal}>
            <h2>Statystyki</h2>
            <div className={styles.container}>
                <div className={styles.statsBox}>
                    <span className={styles.played}>{gamesPlayed}</span>
                    <p>rozegrane gry</p>
                </div>
                <div className={styles.statsBox}>
                    <span className={styles.win}>{wins}</span>
                    <p>wygrane gry</p>
                </div>
                <div className={styles.statsBox}>
                    <span className={styles.streak}>{winStreak}</span>
                    <p>wygrane gry z rzędu</p>
                </div>
            </div>
        </Modal>
    )
}

export default StatsModal