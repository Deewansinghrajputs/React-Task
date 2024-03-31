import React, { useEffect, useState } from 'react'
import './Jokegenerator.css'

const Jokegenerator = () => {
    const[jokes, setJokes] = useState("null");
    const [showDelivery, setShowDelivery] = useState(false);
    const [error, setError] = useState(null);
    const fetchJokes = async() =>  {
      try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Dark');
        if (!response.ok) {
          throw new Error('Sorry .......!!');
        }
        const data = await response.json();
        setJokes(data);
        setShowDelivery(false);
      } catch (error) {
        setError(error.message);
      }
     
    };
    useEffect(()=>{
        fetchJokes();

    },[])
    const handleRandomClick = () => {
      fetchJokes();
    };
    const handleDeliverClick = () => {
      setShowDelivery(!showDelivery);
    };
  
  return (
    <>
    <div className='Jokeapp bg-gray-100 min-h-screen flex flex-col justify-center items-center'>
    <h1 className="text-3xl font-bold mb-4">Random Jokes😊😊</h1>
        <p>Category: {jokes.category}</p>
        <p>{jokes.type === 'twopart' ? jokes.setup : jokes.joke}</p>
        {showDelivery && <p className="delivery text-lg mb-4">{jokes.delivery}</p>}

        <button className="m-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2  px-4 rounded"
              onClick={handleDeliverClick}>
              {showDelivery ? 'Hide Delivery' : 'Deliver'}
            </button>
            <button className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleRandomClick}>Random</button>
    </div>

    </>
  )
}

export default Jokegenerator;