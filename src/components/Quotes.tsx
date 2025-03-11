import React, { useEffect, useState } from "react";

interface Quote{
    author:string;
    id: number;
    quote:string;
}

const Quotes: React.FC = ()=>{
    const [quote, setQuote] = useState<Quote | null>(null);


    // first fetch of the quote
    useEffect(()=>{
        fetchQuotes();
    },[])

    const fetchQuotes=()=>{
        fetch("https://qapi.vercel.app/api/random")
        .then(response => response.json())
        .then(data => {
            setQuote(data);
        })
        .catch(error => console.error("Error fetching quote:", error));
    }
    return(
        <div className="quote_container">
            <button className="quote_button" onClick={()=>{fetchQuotes()}}>New Quote</button>
            <div className="quote_subContainer">
                <div className="quoteDiv">
                    <p className="quote">"{quote?.quote}"</p><br/>
                    <p className="author">-{quote?.author}-</p>
                </div>
                <a href="https://jasonrlh95.github.io/all_projects/" target="_blank">
                    <div className="logoPic"></div>
                </a>
            </div>
        </div>
    );
}

export default Quotes;