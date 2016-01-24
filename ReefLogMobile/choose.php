<?php
require_once "header.php";
isLoggedIn();
$query = "SELECT status FROM `entry` WHERE `userid`=" . $_SESSION['id'] . " AND `status`=0";
$results = mysqli_query($connect, $query);
echo $query;
$resultArray = [];
while ($row = mysqli_fetch_assoc($results)) {
    $resultArray[] = $row;
}

if (count($resultArray) > 0) {
    $showReview = true;
} else {
    $showReview = false;
}

?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href='https://fonts.googleapis.com/css?family=Ubuntu:500italic,500' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="assets/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="assets/css/style.css">
    <title>ReefSafari</title>
</head>
<body>

<section class="header-section">
    <div id="reeflog-logo" class="col-lg-6">
        <h1><span class="yellow-text">Reef</span><span
                class="white-text italic-text">Safari</span></h1>
    </div>
</section>
<section class="body-section">
    <a href="safari.php" class="btn btn-success login border">Go on a Safari</a>
    <a href="reeflog.php" class="btn btn-success login border">View ReefLog</a>
    <?php if ($showReview) { ?>
        <a href="review.php" class="btn btn-success login border">View Revlog</a>
    <?php } ?>
</section>

<?php require_once "footer.php" ?>
