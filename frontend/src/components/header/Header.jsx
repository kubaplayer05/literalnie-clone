import {useState} from "react";
import {createPortal} from "react-dom";
import helpIcon from "../../assets/help-light.png"
import statsIcon from "../../assets/charts-light.png"
import HelpModal from "../modals/HelpModal.jsx";
import StatsModal from "../modals/statsModal/StatsModal.jsx";
import style from "./Header.module.css"
import Backdrop from "../UI/Backdrop/Backdrop.jsx";

const Header = () => {

    const [showHelpModal, setShowHelpModal] = useState(false)
    const [showStatsModal, setShowStatsModal] = useState(false)

    const openHelpModal = () => {
        setShowHelpModal(true)
    }

    const closeHelpModal = () => {
        setShowHelpModal(false)
    }

    const openStatsModal = () => {
        setShowStatsModal(true)
    }

    const closeStatsModal = () => {
        setShowStatsModal(false)
    }

    return (
        <>
            <header className={style.header}>
                <img onClick={openStatsModal} className={style.icon} alt="charts icon" src={statsIcon}/>
                <h1 className={style.title}>Literalnie</h1>
                <img onClick={openHelpModal} className={style.icon} alt="help icon" src={helpIcon}/>
            </header>
            {showHelpModal && createPortal(<HelpModal
                closeHelpModal={closeHelpModal}/>, document.querySelector("#modal-root"))}
            {showStatsModal && createPortal(<StatsModal
                closeStatsModal={closeStatsModal}/>, document.querySelector("#modal-root"))}
            {(showHelpModal || showStatsModal) && createPortal(<Backdrop/>, document.querySelector("#modal-root"))}
        </>
    )
}

export default Header