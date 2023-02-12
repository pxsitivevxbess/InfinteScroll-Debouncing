import React, { useState,useEffect, useRef } from "react";  
import axios from 'axios';  
import { Card } from 'react-bootstrap';
import BookCard from "./BookCard";
function BookSearch() {  
     const resLen = 10;
     const apiKey = "AIzaSyCqi37mzRrzkBrDZDb0BX9_IarX5iMOT88";
    const [book, setBook] = useState("");  
    const [result, setResult] = useState([]);    
    const [lastElement, setLastElement] = useState(null);
    const[currIndex,setCurrIndex] = useState(0);
  
    function handleChange(event) {  
        const book = event.target.value;  
        setBook(book);  
        setResult([]);
        setCurrIndex(0);
    }  
    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    setCurrIndex((prevInd)=>prevInd+resLen)
                }
            })
    );
   
   const callApi = ()=>{
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=" + apiKey +"&startIndex="+currIndex+ "&maxResults="+resLen)  
    .then(data => {  
        setResult((prevData)=>{
            return prevData.concat(data.data.items);
        });  
    }) 
};
    
    useEffect(() => {
      const currentElement = lastElement;
      const currentObserver = observer.current;
       if (currentElement) {
         currentObserver.observe(currentElement);
       }

        return () => {
        if (currentElement) {
            currentObserver.unobserve(currentElement);
            
        }
        };
    }, [lastElement]);

    useEffect(()=>
    {
       if(book){
       let timerOut =  setTimeout(callApi,800);
       
       return ()=> clearTimeout(timerOut);
       }
        
    },[book,currIndex]); 
    return (  
        <>
        <div>
            <h1>Book Catalog</h1>
        </div>
        
            <div className="card-header main-search">  
                <div className="row">  
                    <div className="col-12 col-md-3 col-xl-3">  
                        <input onChange={handleChange} className="AutoFocus form-control" placeholder="Type something..." type="text" />  
                    </div>  
                </div> 
            </div>  

            <div className="container">  
                <div className="row">  
                    {result.length > 0 && result.map((book,index) => { 
                       return(
                        index===result.length-1?(<div ref ={setLastElement}>
                         <BookCard book={book} />
                         </div>):( 
                         <BookCard book ={book} />
                        )

                       )    
                    })}
                </div>  
            </div>  
        
        </>
  
    )  
}  
  
export default BookSearch