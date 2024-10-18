document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();

    if (fileInput.files.length === 0) {
        alert('Please select a file!');
        return;
    }

    formData.append('file', fileInput.files[0]);

    // Simulate an AJAX request
    const reader = new FileReader();
    reader.onload = function (e) {
        displayImage(e.target.result);
    };
    reader.readAsDataURL(fileInput.files[0]);
});

function displayImage(src) {
    const gallery = document.getElementById('gallery');
    const img = document.createElement('img');
    img.src = src;
    gallery.appendChild(img);
}
