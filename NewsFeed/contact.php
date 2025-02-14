<?php
// Handle form data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    // Send email or store data in database
    echo json_encode(['message' => 'Form submitted successfully!']);
} else {
    echo json_encode(['error' => 'Invalid request method!']);
}
?>