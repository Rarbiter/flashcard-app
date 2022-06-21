import {Link} from "react-router-dom"
import React, { useState, useEffect } from "react";
import {listDecks, deleteDeck} from "../utils/api";

function Home() {
 const [decks, setDecks] = useState([]);
    
  useEffect(() => {
  const abortController = new AbortController(); // Create a new `AbortController`

  async function loadDeck() {
    try {
      const response = await listDecks(
       
        abortController.signal  // Pass the `AbortController` signal to `fetch()`
      );
      
      setDecks(response);
    } catch (error) {
      if (error.name === "AbortError") {
        // Ignore `AbortError
      } else {
        throw error;
      }
    }
  }

  loadDeck();
document.title = "Flashcards are great.";
  return () => {
    document.title = ""
    abortController.abort(); // Cancels any pending request or response
  };
}, []);
 
function onDelete (deckId) {
const answer = window.confirm ("Delete this deck?")
if (answer) {
  deleteDeck(deckId)
}
}

  return (
    <header className="jumbotron bg-dark">
      <div className="container">
        <Link to= "/decks/new">+ Create Deck</Link>
        <p className="lead">This is a homepage.</p>
        {decks.map (deck =><div className="card" key={deck.id}>
                     <div className="card-body">
                       <h5 className="card-title">{deck.name}</h5>
                       <p className="card-text">{deck.description}</p>
                       <span>{deck.cards.length} cards</span>
                       <Link to={`/decks/${deck.id}`} className="btn btn-primary">View</Link>
                       <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
                       <button onClick= {()=>onDelete(deck.id)}>Delete</button>
                     </div>
                  
                   </div>)
                   }

      </div>
    </header>
  );
}

export default Home;