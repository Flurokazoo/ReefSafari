<?php
require_once "config.php";
session_start();

$userId = $_SESSION['id'];

$query = "SELECT firstName, lastName, avatar FROM user WHERE id = '" . $userId . "'";
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
        <div class="col-sm-4"></div>
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
            <h2 class="name white-text"><?= $user['firstName'] . " " . $user['lastName'] ?></h2>

            <?php if ($currentPage != "menu.php") { ?>
                <span class="yellow-text" id="settings-box"><span class="glyphicon glyphicon-home"
                                                                  aria-hidden="true"></span><span
                        class="settings-box-glyphicon"><a href="menu.php"
                                                          class="settings">Go to Menu</a></span></span>
            <?php } ?>

            <span class="yellow-text" id="logout-box"><span class="glyphicon glyphicon-log-out"
                                                            aria-hidden="true"></span><span
                    class="settings-box-glyphicon"><a href="logout.php"
                                                      class="">Logout</a></span></span>
        </div>
    </section>



