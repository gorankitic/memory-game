
// styles
import "./Card.css";

const Card = ({ card, handleChoice, flipped, disabled }) => {

    const handleClick = () => {
        if(!disabled) {
            handleChoice(card);
        }
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="card-front" src={card.src} alt="card-front" />
                <img className="card-back" src="/img/cover.png" alt="card-back" onClick={handleClick} />
            </div>
        </div>
    )
}

export default Card;