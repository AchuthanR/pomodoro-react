import "./Navbar.css";
import { useState } from "react";
import Modal from "./Modal";
import Settings from "./Settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

function Navbar(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    function toggleModal() {
        setIsModalVisible(!isModalVisible);
    }

    return (
        <div className="Navbar">
            <h1 className="Navbar__app-name">Pomodoro timer</h1>
            <button type="button" className="Navbar__settings-btn secondary-btn" title="Settings" onClick={toggleModal}>
                <FontAwesomeIcon icon={solid("gear")} style={{ height: "16px", width: "16px" }} />
            </button>
            {isModalVisible ?
                <Modal>
                    <Settings closeModal={toggleModal} settings={props.settings} settingsHandleChange={props.settingsHandleChange} />
                </Modal>
                : null}
        </div>
    );
}

export default Navbar;