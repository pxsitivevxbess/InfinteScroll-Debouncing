import React from "react";
import { Card } from 'react-bootstrap';

const BookCard = (props)=>
{
    const { book = 'empty' } = props || {};
   return (
    <div className="col-sm-2" >
                          
    <Card style={{ 'marginTop': '10px' }}>  

        <Card.Img variant="top" src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : ''} alt={book.title} />  
        <Card.Body>  
            <h5 className="card-title">{book?.volumeInfo?.title}</h5>  
            <a className="btn btn-primary" href = {book?.volumeInfo?.previewLink}>Know more</a>  
        </Card.Body>  
    </Card>

</div>
   );
}

export default BookCard;