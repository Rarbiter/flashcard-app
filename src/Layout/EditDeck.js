import React, {useEffect, useState} from "react";
import {DeckForm} from "./DeckForm";
import {Link} from "react-router-dom";
import {readDeck, updateDeck} from "../utils/api";
import {useParams} from "react-router-dom";
//decks/:deckId/edit


function EditDeck() {
    const [deck, setDeck] = useState({name: "", description: ""});
    

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

   const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted:", deck);
    updateDeck (deck)
    setDeck({});
};
    
     return (
         <div className="container">
         <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
  </ol>
</nav>
<DeckForm  formData={deck} setFormData={setDeck} handleSubmit={handleSubmit}/>
         </div>

         

     );
   }
   
   export default EditDeck;