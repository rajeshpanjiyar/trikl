import React, {useState, useEffect} from 'react';
import './App.css';
import axios from "axios";
import useDragger from './hooks/useDragger';
import {message} from 'antd';

function App() {
  const [currentText, setCurrentText] = useState("");
  const [overlayText, setOverlayText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchImage();
  }, []);

  useDragger("circle");

  const fetchImage = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
      );
      console.log(response);
      setImageUrl(response.data.urls.regular);
    } catch (error) {
      message.error("Unsplash Rate limit exceeded.")
      console.error("Error fetching image:", error);
    }
  };

  const handleQuery = ()=> {
    setOverlayText(currentText);
  }

  return (
    <main>
      <nav>
        <div className="menuIcon">
          <input
            className="text"
            type="text"
            placeholder="Enter a text"
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
          />
          <button className="add-button" onClick={handleQuery} onKeyUp={handleQuery}>
            Add Text
          </button>
        </div>
        <ul className="nav-links"></ul>
      </nav>
      <div 
      style = {{backgroundImage: `url(${imageUrl})`}}
      className="container">
       <div id="circle" className="circle">
        <div id="pink-box" className="box text-overlay">
          <textarea 
          onResize = {(e)=>{
            console.log(e);
          }}
          className="resizable-textarea"
          value={overlayText} onChange={(e)=>{
            setOverlayText(e.target.value)
          }}/>
        </div>
    </div>
      </div>
    </main>
  );
}

export default App;
