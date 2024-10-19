import React, { useState } from 'react';

function App() {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    event.preventDefault();
    const fileInput = event.target.elements.fileInput;
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages([...images, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <h1>Upload and View Images</h1>
      <form onSubmit={handleImageUpload}>
        <input type="file" id="fileInput" accept="image/*" />
        <button type="submit">Upload Image</button>
      </form>
      <div id="gallery">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`uploaded ${index}`} />
        ))}
      </div>
    </div>
  );
}

export default App;
