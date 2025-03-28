<?php
header('Content-Type: application/json');

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if file was uploaded
if (!isset($_FILES['zipFile'])) {
    echo json_encode(['success' => false, 'message' => 'Geen bestand geüpload']);
    exit;
}

$file = $_FILES['zipFile'];
$email = $_POST['email'];

// Debug information
$uploadDir = 'uploads/';
$uploadDirFullPath = __DIR__ . '/' . $uploadDir;

// Log directory information
error_log("Upload directory: " . $uploadDirFullPath);
error_log("Directory exists: " . (file_exists($uploadDirFullPath) ? 'Yes' : 'No'));
error_log("Directory writable: " . (is_writable($uploadDirFullPath) ? 'Yes' : 'No'));

// Create upload directory if it doesn't exist
if (!file_exists($uploadDirFullPath)) {
    if (!mkdir($uploadDirFullPath, 0777, true)) {
        echo json_encode(['success' => false, 'message' => 'Kon upload directory niet aanmaken']);
        exit;
    }
    error_log("Created upload directory");
}

// Validate file type
$allowedTypes = ['application/zip', 'application/x-zip-compressed'];
if (!in_array($file['type'], $allowedTypes)) {
    echo json_encode(['success' => false, 'message' => 'Alleen ZIP bestanden zijn toegestaan']);
    exit;
}

// Generate unique filename
$filename = uniqid() . '_' . basename($file['name']);
$targetPath = $uploadDirFullPath . $filename;

// Log file information
error_log("Target path: " . $targetPath);
error_log("File type: " . $file['type']);
error_log("File size: " . $file['size']);
error_log("File error: " . $file['error']);

// Move uploaded file
if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    error_log("File successfully moved to: " . $targetPath);
    
    // Send email
    $to = 'gds.ll@outlook.com';
    $subject = 'Nieuwe bestelling ontvangen';
    
    $message = "Er is een nieuwe bestelling ontvangen:\n\n";
    $message .= "E-mail klant: " . $email . "\n";
    $message .= "ZIP bestand: " . $filename . "\n";
    $message .= "Bestandspad: " . $targetPath . "\n";
    
    $headers = 'From: ' . $email . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Bestand succesvol geüpload en e-mail verzonden']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Bestand geüpload maar e-mail kon niet worden verzonden']);
    }
} else {
    $error = error_get_last();
    echo json_encode([
        'success' => false, 
        'message' => 'Fout bij het uploaden van het bestand',
        'error' => $error
    ]);
}
?> 