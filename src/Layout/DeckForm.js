import React from "react";

export const DeckForm = ({ formData, setFormData, handleSubmit }) => {


    //const [formData, setFormData] = useState({ ...initialFormState });
    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">
                Enter Name:
                <input
                    id="name"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    style={{ width: "100%" }}
                />
            </label>
            <br />
            <label htmlFor="description">
                Describe your deck:
               
                <textarea
                    id="description"
                    type="text area"
                    name="description"
                    onChange={handleChange}
                    value={formData.description}
                    style={{ width: "100%" }}
                    >
                    </textarea>
                
            </label>
            <br />
            <button type="cancel">Cancel</button>
            <button type="submit">Submit</button>
            
        </form>
    );
}
