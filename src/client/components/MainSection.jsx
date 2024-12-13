// import './style.css'; 
import React, { useState, useEffect } from 'react'; 
import VerbSection from './VerbSection'; 
import VocabSection from './VocabSection'; 
import GrammarSection from './GrammarSection'; 


const MainSection = () => {

    return (
        <div className='mainSection'>
            <VerbSection />
            <VocabSection />
            <GrammarSection />
        </div>
    );
};

export default MainSection; 