import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Modal, Button, ProgressBar } from 'react-bootstrap';
import './App.css'; // Import custom CSS for additional styles

function App() {
  const [images, setImages] = useState(new Array(24).fill(null)); // 15 images
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [progress, setProgress] = useState(0);

  // Handle image upload
  const handleImageUpload = (event, index) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadstart = () => setProgress(0);
      reader.onprogress = (event) => setProgress((event.loaded / event.total) * 100);
      reader.onload = () => {
        const newImages = [...images];
        newImages[index] = reader.result; // Set uploaded image
        setImages(newImages);
        setProgress(100);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image click for modal
  const handleImageClick = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  // Handle image removal
  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages[index] = null; // Remove image
    setImages(newImages);
  };

  return (
    <div className="App container art-gallery">
      <h1 className="my-4 text-center gallery-title">UPLOAD AND VIEW IMAGES</h1>

      <div className="row g-3">
        {images.map((image, index) => (
          <div key={index} className="col-4 col-md-3 col-lg-2">
            <div className="card image-slot">
              {image ? (
                <img 
                  src={image} 
                  alt={`uploaded ${index}`} 
                  className="img-fluid gallery-image" 
                  onClick={() => handleImageClick(image)} 
                  style={{ cursor: 'pointer' }} 
                />
              ) : (
                <div className="placeholder text-center">
                  <label className="btn btn-outline-primary">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, index)}
                      style={{ display: 'none' }}
                    />
                    <img 
                      src="https://via.placeholder.com/150" // Placeholder image
                      alt="Placeholder"
                      className="img-thumbnail"
                    />
                    <div>Upload Image</div>
                  </label>
                </div>
              )}
              {/* Remove Button */}
              {image && (
                <Button variant="danger" className="mt-2" onClick={() => handleRemoveImage(index)}>
                  Remove Image
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Image Preview Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={modalImage} alt="Preview" className="img-fluid" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Progress Bar */}
      <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mt-3" />
    </div>
  );
}

export default App;

