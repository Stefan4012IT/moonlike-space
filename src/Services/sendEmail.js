const sendEmail = async (formData) => {
    try {
        const response = await fetch('http://localhost:8000/sendEmail.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),  // Pretvori podatke u JSON string
        });
        const data = await response.json();
        console.log(data);  // Ispis odgovora
        if (data.status === 'success') {
            alert('Email sent successfully!');
        } else {
            alert('Failed to send email.');
        }
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export default sendEmail;