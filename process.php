<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    
    // Configura la dirección de correo a la que se enviará el mensaje
    $to = "peraltaignacio64@gmail.com";
    
    // Configura el asunto y el contenido del correo
    $subject = "Mensaje de contacto de $name";
    $headers = "From: $email";
    $message = "Nombre: $name\nEmail: $email\nMensaje:\n$message";
    
    // Envía el correo
    if (mail($to, $subject, $message, $headers)) {
        echo "El mensaje se ha enviado correctamente.";
    } else {
        echo "Hubo un error al enviar el mensaje.";
    }
}
?>
