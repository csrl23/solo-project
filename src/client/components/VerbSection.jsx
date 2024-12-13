import React, { useEffect, useState, useRef } from 'react'; 
// import { nanoid } from 'nanoid'; 
import { LiaEditSolid } from 'react-icons/lia'
import { TiDeleteOutline } from "react-icons/ti";

const VerbSection = () => {
    const [data, setData] = useState([]); 
    const [verb, setVerb] = useState(''); 
    const [meaning, setMeaning] = useState(''); 

    // const buttonId = nanoid(); 

    // renders verbs already in database on intial load 
    useEffect(() => {
        const getVerbs = fetch('/verbs')
        .then(res => res.json())
        .then(data => {
            // console.log('This is the stringified res data object:', data.verbs); 
            setData([...data.verbs])
        })
        .catch(err => {
            console.error('Request failed:', err); 
        }); 
    }, []); 

    const postVerbFunc = () => {
        if (!!verb || !!meaning) {
        // useEffect hook not working, error message: hook must be inside of a function??
        // useEffect(() => {
            const postVerbs = fetch('/verbs', {
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json', 
              }, 
              body: JSON.stringify({ verb, meaning }), 
            })
            .then((res) => {
              if (!res.ok) {
                console.log('The response was not ok. This is the res object:', res);
              } else {
                console.log('This is the res object:', res);
              }
            })
            .catch(err => {
              console.error('Request failed:', err); 
            }); 
        // }, []); 
            addRowFunc(); 
        }
    }; 

    const elementRef = useRef([]); 

    const deleteVerbFunc = (rowKey) => {
        console.log('This is the rowKey:', rowKey); 
        const foundVerbElement = document.getElementById(`verb-${rowKey}`); 
        console.log('The found verb element begins here:', foundVerbElement); 
        const index = rowKey; 

        const element = elementRef.current[index]; 
        if (element) {
          const verbText = element.textContent; 
          console.log('The found verb begins here:', verbText)

          fetch(`/verbs/${verbText}`, {
            method: 'DELETE'
          })
          .then((res) => {
            if (!res.ok) {
              console.log('The response was not ok. This is the res object:', res);
            } else {
              console.log('This is the res object:', res);
            }
          })
          .catch(err => {
            console.error('Request failed', err); 
          }); 

          setData(data.filter(element => element.verb !== verbText)); 
        }
    };

    const addRowFunc = () => {
        setData([...data, { verb , meaning }]); 
        setVerb(''); 
        setMeaning(''); 
    };

    return (
        <div className="component1">
            <h2 className="verbh2">Verbs</h2>
            <div className="verbTable">
                <table className="actualVerbTable">
                    <thead> 
                        <tr>
                            <th className="verbTitles">Verb</th>
                            <th className="verbTitles">Meaning</th>
                            <th className="verbTitles">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td id={`verb-${index}`} ref={(element) => { elementRef.current[index] = element; }} className="verbBox">{row.verb}</td>
                                <td className="meaningBox">{row.meaning}</td>
                                <td className="buttonBox">
                                    <button id={index} className="edit-button"><LiaEditSolid /></button>
                                    <button id={`verb-delete-button${index}`} onClick={() => deleteVerbFunc(index)} className="delete-button"><TiDeleteOutline /></button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <input 
                                    className="verbBox" 
                                    type="text" 
                                    placeholder="Enter verb"
                                    value={verb}
                                    onChange={(e) => setVerb(e.target.value)}
                                />
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
                <button className="add-button" onClick={postVerbFunc}>Add Verb</button>
            </div>
        </div>
    );
};

export default VerbSection; 