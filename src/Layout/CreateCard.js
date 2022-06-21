import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {readDeck, createCard} from "../utils/api";
import {CardForm} from "./CardForm";
//decks/:deckId/cards/new


function CreateCard() {
    const [deck, setDeck] = useState([]);
    
    const {deckId} = useParams() 
    

    const initialFormState = {
      front: "",
      back: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted:", formData);
    createCard (formData)
    setFormData({ ...initialFormState });
};
       
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
  
     return (
      
         <div className="container">
 <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
    <li className="breadcrumb-item active" aria-current="page"><Link to ={`/decks/${deck.id}/cards/new`}>Add Card</Link></li>
  </ol>
</nav> 
<CardForm  formData={formData} setFormData={setFormData} handleSubmit={handleSubmit}/>
         </div>         
     );
   }
   
   export default CreateCard;
