<?php




$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];
$token = "566615026:AAEgtbt0oLVzQvQIq4rL5OpGWvVRYTkU8ZE";
$chat_id = "-302141440";


$arr = array(
	'Имя пользователя: ' => $name,
	'Email: ' => $email,
	'Телефон: ' => $phone,
	'Сообщение: ' => $message
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

$email_body = "Name: ".$name."\nEmail: ".$email."\nPhone: ".$phone."\nMessage: ".$message;
$submition = "new client";
$to = "soundevolution.info@gmail.com";

$headers = "From: ".$email;
mail($to, $submition, $email_body, $headers);






header("Location: index.htm");

?>
