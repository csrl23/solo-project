import './style.css'; 
import React from 'react'; 
import { createRoot } from 'react-dom/client'; 

import MainSection from './components/MainSection'; 


const App = () => {
    return (
        <div>
            <header>
                <h1 className="app-name">Linguai</h1>
            </header>
            <main className="main">
                <h2 className="notebook-lang">French</h2>
                <section className="field">
                    <div>
                        <MainSection />
                    </div>
                </section>
            </main>
            <footer className="footer">
                <p className="footer-p">&copy; <time dateTime="2024">2024</time> Linguai</p>
            </footer>
        </div>
    )
}; 

createRoot(document.querySelector('#root')).render(<App />); 
