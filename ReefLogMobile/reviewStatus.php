<?php
require_once "config.php";
$id = $_POST['id'];

$coralType = $_POST['coralType'];
$query = "UPDATE `entry` SET `status` = 1, `coralId` = " . $coralType . "  WHERE `id` = " . $id;

$results = mysqli_query($connect, $query);
header("Location: review.php");