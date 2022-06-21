import React from "react";


export const CardForm = ({ formData, setFormData, handleSubmit }) => {


    //const [formData, setFormData] = useState({ ...initialFormState });
    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="front">
                Front:
                <textarea 
                    id="front"
                    type="front"
                    name="front"
                    onChange={handleChange}
                    value={formData.front}>
                    </textarea>
            </label>
            <br />
            <label htmlFor="back">
                Back:
                <textarea
                    id="back"
                    type="back"
                    name="back"
                    onChange={handleChange}
                    value={formData.back}>
                    </textarea>
            
            </label>
            <br />
            <button type="cancel">Cancel</button>
            <button type="submit">Submit</button>
            
        </form>
    );
}