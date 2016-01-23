<?php
require_once "config.php";



$query = "SELECT firstName, lastName, avatar FROM user WHERE id = 1";
$results = mysqli_query($connect, $query);
$user = mysqli_fetch_assoc($results);

$currentPage = basename($_SERVER['PHP_SELF']);


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href='https://fonts.googleapis.com/css?family=Ubuntu:500italic,500' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="assets/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="assets/css/style.css">
    <title>ReefLog</title>
</head>
<body>
<div class="container">
    <section class="header-section">
        <div class="col-lg-6">
        </div>
        <div class="col-lg-6">
            <div class="col-sm-2">
                <img class="avatar" src="<?= $user['avatar'] ?>"
                     alt="avatar">
            </div>
            <div class="col-sm-10 user-options">
                <h2 class="name white-text"><?= $user['firstName'] . " " . $user['lastName'] ?></h2>
            </div>

        </div>
    </section>
</body>
</html>


