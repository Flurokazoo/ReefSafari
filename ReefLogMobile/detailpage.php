<?php
require_once "config.php";
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
    <img class="img-dp" src="<?php echo $row['avatar']; ?>">

</div>
<div class="container-dp">
    <h1 class="h1-dp"><?= $row['name'] ?></h1>
    <?php if($row['venomous'] == 1){?>
        <span class="venomous-dp">Venomous</span>
    <?php } else if ($row['venomous'] > 1) { ?>
        <span class="venomous-dp">Very Venomous</span>
    <?php } ;?>
    <span class="span-dp">Rarity:</span>
    <strong class="strong-dp"><?= $row['rarity']; }?></strong>
    <span class="span-dp"></span>
    <strong class="strong-dp"></strong>


    <a class="a-dp btn btn-success">Save to <span>ReefLog</span></a>

    <span class="white-text wrong-coral">Is this coral tagged wrongly?</span>
    <div class="btn-group" role="group" aria-label="...">
        <button type="button" class="btn btn-default btn-warning review-button">Review Now</button>
        <button type="button" class="btn btn-default btn-danger review-button">Review Later</button>
    </div>

    <?php include_once "footer.php"?>
