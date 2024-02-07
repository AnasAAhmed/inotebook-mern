import React, { useState } from 'react'
import toast from 'react-hot-toast';


const TextForm = () => {
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText)
        toast.success("Text Converted to Uppercase");
    }

    const handleCapClick = () => {
        let newText = text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        setText(newText);
        toast.success("Text Capitalized");
    };
    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText)
        toast.success("Text Converted to Lowercase");
    }

    const handleClearClick = () => {
        let newText = '';
        setText(newText);

    }

    const handleOnChange = (event) => {
        setText(event.target.value)
    }


    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.success("Text Copied to Clipboard");
    }


    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        toast.success("Extra Spaces Removed");
    }

    const [text, setText] = useState('');
    // text = "new text"; // Wrong way to change the state
    // setText("new text"); // Correct way to change the state
    return (
        <>
            <div className="container homevh" >
                <h1 className='mb-3 fff'>Modify Your Text</h1>
                <div className="mb-3">
                    <textarea className="form-control border border-5" value={text} onChange={handleOnChange} id="myBox" rows="8">Enter Your Text</textarea>
                </div>
                <button disabled={text.length === 0} className="btn btn-primary rounded-pill mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button disabled={text.length === 0} className="btn btn-primary rounded-pill mx-1 my-1" onClick={handleCapClick}>Capitalize</button>
                <button disabled={text.length === 0} className="btn btn-primary rounded-pill mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
                <button disabled={text.length === 0} className="btn btn-primary rounded-pill mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
                <button disabled={text.length === 0} className="btn btn-primary rounded-pill mx-1 my-1" onClick={handleCopy}>Copy Text</button>
                <button disabled={text.length === 0} className="btn btn-primary rounded-pill mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
                <div className="container my-3" >
                    <h2>Your text summary</h2>
                    <p>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} words and {text.length} characters</p>
                    <p>{0.008 * text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} Minutes read</p>
                    <h2>Preview</h2>
                    <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
                </div>
            </div>
        </>
    )
}
export default TextForm;