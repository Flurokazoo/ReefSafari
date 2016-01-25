<?php
require_once "header.php";
isLoggedIn();

$query = "SELECT status FROM `entry` WHERE `userid`=" . $_SESSION['id'] . " AND `status`=0";
$results = mysqli_query($connect, $query);
$checkArray = [];
while ($row = mysqli_fetch_assoc($results)) {
    $checkArray[] = $row;
}

if (count($checkArray) <= 0) {
    header("Location: menu.php");
}


$coralTypeQuery = "SELECT `name`, `id` FROM `coral`";
$coralTypeResults = mysqli_query($connect, $coralTypeQuery);
$resultArray = [];
while ($row = mysqli_fetch_assoc($coralTypeResults)) {
    $resultArray[] = $row;
}

?>
<section class="body-section">
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
                                <form method="post" action="reviewStatus.php">
                                    <input class="id-form-review" name="id" type="hidden" value="">
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
    <div id="content-container" class="col-sm-12">

    </div>
</section>
<?php require_once "footer.php" ?>
<script src="assets/js/review.js"></script>
