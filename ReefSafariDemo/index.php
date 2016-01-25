<?php
require_once "header.php";
?>

<div id="reeflog-logo">
    <h1><span class="yellow-text">Reef</span><span
            class="white-text italic-text">Safari</span></h1>
</div>
<section class="body-section">
    <div id="status-box"><?php if (isset($_GET["status"]) == 1){
                echo "<h2>Bedankt voor je toevoeging! Bekijk je entry op de laptop.</h2>";
            }; ?></div>
    <input type="file" id="take-picture" accept="image/jpeg" class="btn btn-success login border" placeholder="Upload/Take a picture">
    <label for="take-picture" class="btn btn-success login border">Upload/Take a Picture </label>


</section>

<?php require_once "footer.php" ?>
<script src="assets/js/menu.js"></script>
