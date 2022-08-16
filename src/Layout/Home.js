import {Link} from "react-router-dom"
import React, { useState, useEffect, useHistory } from "react";
import {listDecks, deleteDeck} from "../utils/api";

function Home() {
 const [decks, setDecks] = useState([]);
 const history = useHistory();
    
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
 
async function onDelete (deckId) {
  const answer = window.confirm ("Delete this deck?")
  if (answer) {
    console.log("onDelete inside if")
    console.log(answer)
    await deleteDeck(deckId)
    history.push ("/")
  }
}

  return (
    
      <div className="container">
         
        <Link className="btn btn-dark p-2" to= "/decks/new">+ Create Deck</Link>
            
        
        {decks.map (deck =><div className="card mt-3" key={deck.id}>
                     <div className="card-body">
                       <p className="card-subtitle mb-2 text-muted float-right">{deck.cards.length} cards</p>
				<h4 className="card-title">{deck.name}</h4>
				<p className="card-text">{deck.description}</p>
                       <Link to={`/decks/${deck.id}`} className="btn btn-primary ">View</Link>
                       <Link to={`/decks/${deck.id}/study`} className="btn btn-primary ml-3">Study</Link>
                       <button className="btn btn-danger ml-3" onClick= {()=>onDelete(deck.id)}>Delete</button>
                     </div>
                  
                   </div>)
                   }

   
    </div>
  );
}

export default Home;