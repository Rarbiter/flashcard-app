import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {readDeck, updateCard, readCard} from "../utils/api";
import {useParams} from "react-router-dom";
import {CardForm} from "./CardForm";
//decks/:deckId/cards/:cardId/edit


function EditCard() {
    const [deck, setDeck] = useState([]);

    const [card, setCard] = useState([]);

    const {deckId, cardId} = useParams()

    useEffect(() => {
      const abortController = new AbortController(); // Create a new `AbortController`
    
      async function loadCard() {
        try {
          const response = await readCard(cardId,
           
            abortController.signal  // Pass the `AbortController` signal to `fetch()`
          );
          
          setCard(response);
        } catch (error) {
          if (error.name === "AbortError") {
            // Ignore `AbortError
          } else {
            throw error;
          }
        }
      }
    
      loadCard();
    document.title = "Flashcards are great.";
      return () => {
        document.title = ""
        abortController.abort(); // Cancels any pending request or response
      };
    }, [cardId]);

  
  
    const handleSubmit = (event) => {
      event.preventDefault();
      updateCard (card)
      setCard({});
  };
       
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
    
     return (
    
         <div>
      <nav aria-label="breadcrumb">
<ol className="breadcrumb">
 <li className="breadcrumb-item"><Link to="/">Home</Link></li>
 <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
 <li className="breadcrumb-item active" aria-current="page">{card.name}</li>
</ol>
</nav> 

<h5>Edit Card</h5>

           <CardForm formData={card} setFormData={setCard} handleSubmit={handleSubmit}/>  
         </div>
     )
}
   
   export default EditCard;