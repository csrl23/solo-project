import React, { useState, useEffect } from 'react'; 
import { nanoid } from 'nanoid'
import { LiaEditSolid } from 'react-icons/lia'
import { TiDeleteOutline } from "react-icons/ti";


const VocabSection = () => {
    const [data, setData] = useState([]); 
    const [vocab, setVocab] = useState(''); 
    const [lexCat, setLexCat] = useState(''); 
    const [meaning, setMeaning] = useState(''); 

    // const buttonId = nanoid(); 

    useEffect(() => {
        const getVocabs = fetch('/vocabs')
        .then(res => res.json())
        .then(data => {
            console.log('This is the stringified res data object:', data.vocabs);
            setData([...data.vocabs]);
        })
        .catch(err => console.error('Request failed:', err))
    }, []); 

    const postVocabFunc = () => {
        if (!!vocab || !!lexCat || !!meaning) {
            const postVocab = fetch('/vocabs', {
                method: 'POST', 
                headers: {
                  'Content-Type' : 'application/json', 
                }, 
                body: JSON.stringify({ vocab, lexCat, meaning }),
            })
            .then((res) => {
              if (!res.ok) {
                console.log('The response was not ok. This is the res object:', res);
              } else {
                console.log('This is the res object:', res);
              }
            })
            .catch((err) => {
              console.error('Request failed:', err); 
            })

            addRowFunc(); 
        }
    };
    
    const addRowFunc = () => {
        setData([...data, { vocab, lexCat, meaning }]); 
        setVocab(''); 
        setLexCat(''); 
        setMeaning(''); 
    }; 

    return (
        <div className="component2">
            <h2 className="vocabh2">Vocabulary</h2>
            <div className="vocabTable">
                <table className="actualVocabTable">
                    <thead> 
                        <tr>
                            <th className="vocabTitles">Word</th>
                            <th className="vocabTitles">Lexical Category</th>
                            <th className="vocabTitles">Meaning</th>
                            <th className="vocabTitles">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td className="vocabBox" >{row.vocab}</td>
                                <td className="lexCatBox">{row.lexCat}</td>
                                <td className="meaningBox">{row.meaning}</td>
                                <td className="buttonBox">
                                    <button className="edit-button"><LiaEditSolid /></button>
                                    <button className="delete-button"><TiDeleteOutline /></button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <input 
                                    className="vocabBox" 
                                    type="text" 
                                    placeholder="Enter word"
                                    value={vocab}
                                    onChange={(e) => setVocab(e.target.value)}
                                />
                            </td>
                            <td>
                                <select name="Category" className="lexCatDrop" value={lexCat} onChange={(e) => setLexCat(e.target.value)}>
                                    <option value="Select Category">Select</option>
                                    <option value="Noun">Noun</option>
                                    <option value="Adjective">Adjective</option>
                                    <option value="Adverb">Adverb</option>
                                    <option value="Pronoun">Pronoun</option>
                                    <option value="Preposition">Preposition</option>
                                    <option value="Interjection">Interjection</option>
                                </select>
                            </td>
                            <td>
                                <input 
                                    className="meaningBox" 
                                    type="text" 
                                    placeholder="Enter meaning"
                                    value={meaning}
                                    onChange={(e) => setMeaning(e.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className="add-button" onClick={postVocabFunc}>Add Word</button>
            </div>
        </div>
    );
};

export default VocabSection; 