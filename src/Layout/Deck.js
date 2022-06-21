import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom"
import {readDeck, deleteCard} from "../utils/api";
///decks/:deckId

function Deck() {
    const [deck, setDeck] = useState({cards:[]});
       const {deckId} = useParams()

     useEffect(() => {
     const abortController = new AbortController(); // Create a new `AbortController`
   
     async function loadDeck() {
       try {
         const response = await readDeck(
          deckId,
           abortController.signal  // Pass the `AbortController` signal to `fetch()`
         );
         
         setDeck(response);
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
   }, [deckId]);

   function onDelete (cardId) {
    const answer = window.confirm ("Delete this card?")
    if (answer) {
      deleteCard(cardId)
    }
    }
    
     return (
      
         <div className="container">
         <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
  </ol>
</nav>   
<div className="card">
  <div className="card-body">
    <h5 className="card-title">{deck.name}</h5>
    <p className="card-text">{deck.description}</p>
    <Link to={`/decks/${deck.id}/edit`} className="btn btn-primary">Edit</Link>
    <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
    <Link to={`/decks/${deck.id}/addCard`} className="btn btn-primary">+ Cards</Link>
    <Link to={`/decks/${deck.id}/delete`} className="btn btn-primary">Delete</Link>
  </div>
</div>
<h3>Cards</h3>
{deck.cards.map(card => <div key ={card.id}>
<h5>{card.front}</h5>
<h5>{card.back}</h5>
<Link to ={`/decks/${deck.id}/cards/${card.id}/edit`}>Edit</Link>
<button onClick= {()=>onDelete(card.id)}>Delete</button>
</div>)}
         </div>
     );
   }
   
   export default Deck;