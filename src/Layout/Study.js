import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import {readDeck} from "../utils/api";
//decks/:deckId/study
 

function Study() {
    const [deck, setDeck] = useState({cards:[]});

    const [front, setFront] = useState (true);

    const [cardIndex, setCardIndex] = useState (0);

    const {deckId} = useParams()
       
     useEffect(() => {
     const abortController = new AbortController(); // Create a new `AbortController`
   
     async function loadDeck() {
       try {
         const response = await readDeck(deckId,
          
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
   
   function flipCard () {
    setFront (!front)
   }

   function next () {
     setCardIndex (cardIndex +1)
   }

   function onRestart (deckId) {
    const answer = window.confirm ("Restart this deck?")
    if (answer) {
      setCardIndex(0)
    }
    }

     return (
      
         <div className="container">
         <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><a href="/">Home</a></li>
    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
  </ol>
</nav>   
<div className="card">
  {deck.cards.length < 3?(<div>Not Enough Cards.</div>):(<div><div className="card-body">
    <h5 className="card-title">{front? deck.cards[cardIndex].front:deck.cards[cardIndex].back}</h5>
    <span>Card {cardIndex + 1} of {deck.cards.length}</span>
    <button className="btn btn-primary ml-2" onClick= {()=>flipCard()}>Flip</button>
    {!front && (<div>
    {deck.cards.length < cardIndex +2 ?(<button className= "btn btn-primary"onClick= {()=>onRestart()}>Restart</button>):(
    <button className="btn btn-primary" onClick= {()=>next()} >Next</button>) }
</div>)}

  </div></div>) }  
</div>
         </div>
     );
   }
   
   export default Study;

