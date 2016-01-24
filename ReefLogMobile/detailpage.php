<?php
require_once "config.php";
include_once "footer.php";
session_start();
isLoggedIn();

$id = $_GET['id'];

$query = "SELECT `avatar`, `name`, `venomous`, `rarity`, `entry`.id FROM `coral` INNER JOIN `entry` ON `entry`.coralId =`coral`.id WHERE `entry`.id = '".$id."' ";
$results = mysqli_query($connect, $query);



?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href='https://fonts.googleapis.com/css?family=Ubuntu:500italic,500' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="assets/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="assets/css/style.css">
    <title>ReefLog</title>
</head>
<body>
<?php while ($row = mysqli_fetch_assoc($results)) {?>
<div class="container-dp">
    <img class="img-dp" src="<?php echo $row['avatar']; }?>">
    <a class="a-dp btn btn-warning">ples later reviw</a>
    <a class="a-dp btn btn-success">Save to <span>ReefLog</span></a>
</div>
<div class="container-dp">
    <h1 class="h1-dp">Koffiepot</h1>
    <?php //if(venomous == 1){?>
        <span class="venomous-dp">Venomous af</span>
    <?php //} ?>
    <span class="span-dp">Rarity:</span>
    <strong class="strong-dp"></strong>
    <span class="span-dp">Habitat:</span>
    <strong class="strong-dp">je moedert</strong>



    <?php include_once "footer.php"?>
