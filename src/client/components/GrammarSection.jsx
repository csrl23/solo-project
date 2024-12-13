import React, { useState } from 'react'; 
import { LiaEditSolid } from 'react-icons/lia'
import { TiDeleteOutline } from "react-icons/ti";

const GrammarSection = () => {
    const [data, setData] = useState([]); 
    const [rule, setRule] = useState(''); 

    const addRuleFunc = () => {
        if (!!rule) {
            setData([...data, { rule }]); 
            setRule(''); 
        }
    }

    return (
        <div className="component3">
            <h2 className="grammarh2">Grammar Rules</h2>
            <div className="grammarNote">
                <textarea 
                    className="textarea" 
                    value={rule} 
                    placeholder="Write down your notes here"
                    onChange={(e) => setRule(e.target.value)}
                />
                <button className="add-button">Save Rules</button>
            </div>
        </div>
    );
}; 

export default GrammarSection; 