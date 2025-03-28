// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const packageName = urlParams.get('package');
const price = urlParams.get('price');

// Update order details
document.getElementById('selectedPackage').textContent = packageName;
document.getElementById('packagePrice').textContent = price;

// Handle form submission
document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const zipFile = document.getElementById('zipFile').files[0];
    const email = document.getElementById('email').value;
    
    if (!zipFile || !email) {
        alert('Vul alle velden in');
        return;
    }
    
    // Create FormData object
    const formData = new FormData();
    formData.append('zipFile', zipFile);
    formData.append('email', email);
    
    // Send data to server
    fetch('upload.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Bestand succesvol geüpload! We nemen zo spoedig mogelijk contact met je op.');
            window.location.href = 'index.html';
        } else {
            alert('Er is een fout opgetreden bij het uploaden van het bestand.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Er is een fout opgetreden bij het uploaden van het bestand.');
    });
}); 