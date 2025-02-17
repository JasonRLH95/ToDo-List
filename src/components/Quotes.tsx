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
            <button className="quote_button" onClick={()=>{fetchQuotes()}}>New Quote</button><br/>
            <div className="quoteDiv">
                <p className="quote">"{quote?.quote}"</p><br/>
                <p className="author">-{quote?.author}-</p>
            </div>
            <div className="logoPic"></div>
        </div>
    );
}

export default Quotes;