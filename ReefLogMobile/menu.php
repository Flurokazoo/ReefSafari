<?php
require_once "header.php";
isLoggedIn();
$query = "SELECT status FROM `entry` WHERE `userid`=" . $_SESSION['id'] . " AND `status`=0";
$results = mysqli_query($connect, $query);
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
<div class="col-sm-4"></div>
<!--<div class="col-sm-4"></div>-->
<div id="reeflog-logo" class="col-sm-4">
    <h1><span class="yellow-text">Reef</span><span
            class="white-text italic-text">Safari</span></h1>
</div>
<section class="body-section">
    <input type="file" id="take-picture" accept="image/jpeg" class="btn btn-success login border" placeholder="Upload/Take a picture">
    <label for="take-picture" class="btn btn-success login border">Upload/Take a Picture </label>

    <a href="reeflog.php" class="btn btn-success login border">View ReefLog</a>
    <?php if ($showReview) { ?>
        <a href="review.php" class="btn btn-success login border">View Revlog</a>
    <?php } ?>
<!--    <img src="about:blank" alt="" id="show-picture">-->
    <p id="status-box"></p>
</section>

<?php require_once "footer.php" ?>
<script src="assets/js/menu.js"></script>
