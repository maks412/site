<?php

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];


$email_body = "Name: ".$name."\nEmail: ".$email."\nPhone: ".$phone."\nMessage: ".$message;
$submition = "new client";
$to = "soundevolution.info@gmail.com";

$headers = "From: ".$email;
mail($to, $submition, $email_body, $headers);

header("Location: index.htm");
?>
