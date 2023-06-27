import {useEffect, useState} from "react";
import Modal from "../UI/Modal/Modal.jsx";

const StatsModal = props => {

    let wins = localStorage.getItem("wins") || 0
    let gamesPlayed = localStorage.getItem("games") || 0
    let winStreak = localStorage.getItem("winStreak") || 0

    const closeStatsModal = () => {
        props.closeStatsModal()
    }

    return (
        <Modal closeModal={closeStatsModal}>
            <h2>Statystyki</h2>
            <div>
                <div>
                    <span>{gamesPlayed}</span>
                    <p>rozegrane gry</p>
                </div>
                 <div>
                    <span>{wins}</span>
                    <p>wygrane gry</p>
                </div>
                 <div>
                    <span>{winStreak}</span>
                    <p>wygrane gry z rzędu</p>
                </div>
            </div>
        </Modal>
    )
}

export default StatsModal