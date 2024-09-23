<?php
// Funkcija za čitanje .env fajla i postavljanje promenljivih u $_ENV
function loadEnv($path) {
    if (!file_exists($path)) {
        throw new Exception('.env file not found');
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Ignorisi komentare
        if (strpos(trim($line), '#') === 0) {
            continue;
        }

        // Podeli linije na ključeve i vrednosti
        list($key, $value) = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);

        // Postavi vrednosti u $_ENV superglobal
        $_ENV[$key] = $value;
    }
}

// Učitaj .env fajl
loadEnv(__DIR__ . '/.env');

// Omogućava CORS (za cross-origin zahteve sa localhost:3000)
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method'
    ]);
    exit();
}

// Preuzimanje podataka iz POST zahteva
$postdata = file_get_contents("php://input");

if (empty($postdata)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'No data received from client'
    ]);
    exit();
}

$request = json_decode($postdata, true);
if (is_null($request)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to decode JSON data'
    ]);
    exit();
}

// Sada kada je JSON dekodiran, izvlačiš podatke iz JSON-a
$email = $request['email'];
$name = $request['name'];
$message = $request['message'];

// Pripremanje podataka za Brevo API
$emailData = [
    'sender' => ['email' => 'stefan4012it@gmail.com'], // Verifikovani email pošiljaoca
    'to' => [['email' => 'stefanra555@gmail.com']],   // Primaoc emaila
    'subject' => "New message from Moonlike.space: " . $name,
    'htmlContent' => "<p><strong>Name:</strong> $name</p>
                      <p><strong>Email:</strong> $email</p>
                      <p><strong>Message:</strong> $message</p>"
];

// Slanje emaila pomoću Brevo API-ja
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.brevo.com/v3/smtp/email');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($emailData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'api-key: ' . $apiKey,  // Unesi svoj stvarni API ključ
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Curl error: ' . curl_error($ch),
    ]);
    curl_close($ch);
    exit();
}

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode == 201) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Email sent successfully!'
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to send email',
        'http_code' => $httpCode,
        'response' => $response
    ]);
}
