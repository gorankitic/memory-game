// hooks
import { useState, useEffect } from "react";
// components
import Card from "./components/Card";
// styles
import './App.css';

const cardImages = [
    { "src": "/img/compas-1.png", matched: false },
    { "src": "/img/map-1.png", matched: false },
    { "src": "/img/pirat-1.png", matched: false },
    { "src": "/img/ship-1.png", matched: false },
    { "src": "/img/sirena-1.png", matched: false },
    { "src": "/img/treasure-1.png", matched: false },
]

const App = () => {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState([0]);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);

    // Shuffle cards at new game, i need 2 * 6 cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));
        setCards(shuffledCards);
        setTurns(0);
        setChoiceOne(null);
        setChoiceTwo(null);
    }

    // Handle user card choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

    // Compare two cards only when both are selected
    useEffect(() => {
        if(choiceOne && choiceTwo) {
            setDisabled(true);
            if(choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if(card.src === choiceOne.src) {
                            return {...card, matched: true}
                        } else {
                            return card;
                        }
                    })
                });
                resetTurns();
            } else {
              setTimeout(() => resetTurns(), 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    console.log(cards)

    // Reset choices and increase turns
    const resetTurns = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
    }
    
    // Start a new game automatically
    useEffect(() => {
        shuffleCards()
    }, []);

    return (
        <div className="App">
            <h1>🦜 A pirate's life for me</h1>
            <p>Yo Ho, Memory game</p>
            <button onClick={shuffleCards}>New Game</button>
        
            <div className="cards-grid">
                {cards.map(card => (
                    <Card 
                        key={card.id} 
                        card={card} 
                        handleChoice={handleChoice} 
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />
                ))}
            </div>
            <p>Turns: {turns}</p>
        </div>
    )
}

export default App;