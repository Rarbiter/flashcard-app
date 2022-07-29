import React, {useEffect, useState} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import {readDeck, createCard} from "../utils/api";
import {CardForm} from "./CardForm";
//decks/:deckId/cards/new


function CreateCard() {
  const history = useHistory();
  const [deck, setDeck] = useState([]);
    
    const {deckId} = useParams() 
    

    const initialFormState = {
      front: "",
      back: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });


  function handleSubmit(event) {
    console.log(" handle submit called");
    console.log("form data is ", formData);
    event.preventDefault(); 
    createCard(deckId, formData); 
    setFormData(initialFormState); 
    history.push(`/decks/${deckId}`);
   }
 // i have called the loadDek in the use effect and it's rendering the cards in the browser you can check it by refreshing the browser
      useEffect(() => { 
        loadDeck();
       }, [deckId]);
   
     async function loadDeck() {
      const abortController = new AbortController();
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
