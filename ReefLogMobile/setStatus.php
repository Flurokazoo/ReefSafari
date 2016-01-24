<?php
require_once "config.php";
$status = $_POST['setType'];
$id = $_POST['id'];

if ($status == "save"){
    $query = "UPDATE `entry` SET `status` = 1 WHERE `id` = " . $id;
} elseif ($status == "update"){
    $coralType = $_POST['coralType'];
    $query = "UPDATE `entry` SET `status` = 1, `coralId` = ".$coralType."  WHERE `id` = " . $id;
}
$results = mysqli_query($connect, $query);
header("Location: choose.php");