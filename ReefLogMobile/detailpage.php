<?php
require_once "config.php";
session_start();
isLoggedIn();

$id = $_GET['id'];

$query = "SELECT `avatar`, `name`, `venomous`, `rarity`, `entry`.id FROM `coral` INNER JOIN `entry` ON `entry`.coralId =`coral`.id WHERE `entry`.id = '" . $id . "' ";
$results = mysqli_query($connect, $query);
$coralTypeQuery = "SELECT `name`, `id` FROM `coral`";
$coralTypeResults = mysqli_query($connect, $coralTypeQuery);
$resultArray = [];
while ($row = mysqli_fetch_assoc($coralTypeResults)) {
    $resultArray[] = $row;
}

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
<?php while ($row = mysqli_fetch_assoc($results)) { ?>
    <div class="container-dp">
        <img class="img-dp" src="<?php echo $row['avatar']; ?>">

    </div>
<div class="container-dp">
    <h1 class="h1-dp"><?= $row['name'] ?></h1>
    <?php if ($row['venomous'] == 1) { ?>
        <span class="venomous-dp">Venomous</span>
    <?php } else if ($row['venomous'] == 2) { ?>
        <span class="very-venomous-dp">Very Venomous</span>
    <?php } else { ?>
        <span class="not-venomous-dp">Not Venomous</span>
    <?php }; ?>
    <span class="span-dp">Rarity:</span>
    <div class="strong-dp"><?= $row['rarity']?></div>
<?php } ?>

    <form class="saveForm" method="post" action="setStatus.php">
        <input name="setType" type="hidden" value="save">
        <input name="id" type="hidden" value="<?= $id ?>">
        <input type="submit" value="Save to ReefLog" class=" saveButton a-dp btn btn-success">
    </form>

    <span class="white-text wrong-coral">Is this coral tagged wrongly?</span>
    <div class="btn-group" role="group" aria-label="...">
        <button id="reviewNow" type="button" class="btn btn-default btn-warning review-button">Review Now</button>
        <button id="reviewLater" type="button" class="btn btn-default btn-danger review-button">Review Later</button>
    </div>

    <div id="reviewModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title white-text">Select the right coral:</h4>

                    <div class="modal-body">

                        <div>
                            <?php foreach ($resultArray as $entry) { ?>
                                <form method="post" action="setStatus.php">
                                    <input name="setType" type="hidden" value="update">
                                    <input name="id" type="hidden" value="<?= $id ?>">
                                    <input name="coralType" type="hidden" value="<?= $entry['id'] ?>">
                                    <input name="submit" type="submit" value="<?= $entry['name'] ?>"
                                           class="btn btn-success coralbtn">
                                </form>
                            <?php } ?>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<?php include_once "footer.php" ?>
<script src="assets/js/detailpage.js"></script>
