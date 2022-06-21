import React, { useState } from "react";
import {Link} from "react-router-dom";
import {createDeck} from "../utils/api";
import {DeckForm} from "./DeckForm";
//decks/new


export const CreateDeck = ({ decks }) => {

    const initialFormState = {
        name: "",
        description: "",
    };
    const [formData, setFormData] = useState({ ...initialFormState });
  

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted:", formData);
        createDeck (formData)
        setFormData({ ...initialFormState });
    };

    return (  
        <div>
            
        <nav aria-label="breadcrumb">
<ol className="breadcrumb">
  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
  <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
</ol>
</nav>
         
        <DeckForm  formData={formData} setFormData={setFormData} handleSubmit={handleSubmit}/>
    </div> );
}

export default CreateDeck;