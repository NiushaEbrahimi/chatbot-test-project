import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faCaretLeft } from "@fortawesome/free-solid-svg-icons"

export default function DemoBadge(){
    return(
        <div className="demo-badge">
            <button className="demo-badge__button" aria-label="Demo version notice">
                <FontAwesomeIcon icon={faBell} size={"2x"}/>
            </button>
            <span className="demo-badge__tooltip">
                <div className="badge-caret"><FontAwesomeIcon size={"2x"} icon={faCaretLeft} /></div>
                This version is without backend for demo
            </span>
        </div>
    )
}