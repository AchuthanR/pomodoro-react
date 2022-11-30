import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

function Navbar(props) {
    return (
        <div className="Navbar">
            <h1 className="Navbar__app-name">Pomodoro timer</h1>
            <button type="button" className="Navbar__settings-btn secondary-btn" title="Settings" onClick={props.openSettingsOnClick}>
                <FontAwesomeIcon icon={solid("gear")} style={{ height: "16px", width: "16px" }} />
            </button>
        </div>
    )
}

export default Navbar;