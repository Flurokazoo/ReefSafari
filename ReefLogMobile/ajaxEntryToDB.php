<?php
require_once "config.php";
$croppedImage = $_POST['croppedImage'];
$thumbnail = $_POST['thumbnail'];
$type = $_POST['type'];
session_start();
$userId = $_SESSION['id'];
$year = date("Y");
$month = date("n");
$day = date("j");
$time = date("G:i");

$query = "INSERT INTO `entry` (`userId`, `status`, coralId, `year`, `month`, `day`, `time`, `avatar`, `avatarThumbnail`) VALUES ('" .$userId. "', 0, '" .$type. "', '" .$year. "', '" .$month. "', '" .$day. "', '" .$time. "', '" .$croppedImage. "', '" .$thumbnail. "')";
$results = mysqli_query($connect, $query);

echo mysqli_insert_id($connect);

