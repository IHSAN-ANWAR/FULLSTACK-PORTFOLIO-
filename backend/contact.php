<?php
// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

// Database config - InfinityFree
$host = 'sql303.infinityfree.com';
$user = 'if0_41342954';
$pass = 'm4auGQtZK93jz';
$dbname = 'if0_41342954_ihsan_db';

// Get form data from POST
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

// Regex validation patterns
$namePattern = '/^[a-zA-Z\s]{2,50}$/';
$emailPattern = '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';
$messagePattern = '/^.{10,500}$/';

// Validate all fields are present
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit();
}

// Validate name with regex using preg_match (PHP's .test() equivalent)
if (!preg_match($namePattern, $name)) {
    echo json_encode(['success' => false, 'message' => 'Invalid name format. Only letters and spaces (2-50 chars)']);
    exit();
}

// Validate email with regex
if (!preg_match($emailPattern, $email)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit();
}

// Validate message with regex
if (!preg_match($messagePattern, $message)) {
    echo json_encode(['success' => false, 'message' => 'Message must be 10-500 characters']);
    exit();
}

// Connect to database (InfinityFree doesn't allow creating databases via code)
$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit();
}

// Create table if not exists
$conn->query("CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

// Insert contact
$stmt = $conn->prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $message);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to save message']);
}

$stmt->close();
$conn->close();
?>
