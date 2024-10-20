import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


function App() {
  // Initialize the state with 9 empty slots (null represents an empty slot)
  const [images, setImages] = useState(new Array(9).fill(null));

  const handleImageUpload = (event, index) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImages = [...images];
        newImages[index] = reader.result; // Set the uploaded image to the specific slot
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App container">
      <h1 className="my-4 text-center">Upload and View Images</h1>
      <div className="row g-3"> {/* Bootstrap grid system */}
        {images.map((image, index) => (
          <div key={index} className="col-4"> {/* 3 items per row */}
            <div className="image-slot border border-primary rounded d-flex justify-content-center align-items-center">
              {image ? (
                <img src={image} alt={`uploaded ${index}`} className="img-fluid" />
              ) : (
                <div className="placeholder text-center">
                  <label className="btn btn-outline-primary">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, index)}
                      style={{ display: 'none' }}
                    />
                    Upload Image
                  </label>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
