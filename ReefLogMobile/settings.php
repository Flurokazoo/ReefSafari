<?php
require_once 'header.php';
isLoggedIn();
$userId = $_SESSION['id'];

$query = "SELECT * FROM user WHERE id = '" . $userId . "'";
$results = mysqli_query($connect, $query);
$user = mysqli_fetch_assoc($results);

if (isset($_POST['update'])) {


    $update = "UPDATE user SET firstName = '" . $_POST['firstname'] . "', lastName = '" . $_POST['lastname'] . "',
               email = '" . $_POST['email'] . "', avatar = '" . $_POST['avatar'] . "' WHERE id = '" . $userId . "'";
    mysqli_query($connect, $update);
    header("Location: settings.php?update=succes");
    exit;
}
$updated = "";
if (isset($_GET['update'])) {

    $updated = '<div class="alert alert-success" role="alert">
                    <span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>
                     Your personal information has been updated.
                </div>';
}

?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Settings</title>
</head>
<body>
<section class="body-section">
    <div id="fixed-nav" class="col-lg-4">
        <div id="reeflog-logo" class="col-lg-6">
            <a href="reeflog.php"><h1><span class="yellow-text">Reef</span><span
                        class="white-text italic-text">Log</span></h1></a>
        </div>
    </div>

    <div id="content-container" class="col-lg-12">
        <div class="col-lg-3">
        </div>
        <div class="col-lg-6">
            <form action="" method="post" class="white-text">
                <?= $updated ?>
                <label for="firstname">First Name: </label>
                <input type="text" name="firstname" id="firstname" class="form-control border"
                       value="<?= $user['firstName'] ?>"/>
                <br>
                <label for="lastname">Last Name: </label>
                <input type="text" name="lastname" id="lastname" class="form-control border"
                       value="<?= $user['lastName'] ?>"/>
                <br>
                <label for="adres">E-mail: </label>
                <input type="text" name="email" id="email" class="form-control border" value="<?= $user['email'] ?>"/>
                <br>
                <label for="adres">Avatar: </label>
                <input type="text" name="avatar" id="avatar" class="form-control border"
                       value="<?= $user['avatar'] ?>"/>
                <br>
                <input type="submit" name="update" class="updated btn btn-success button border" value="Update"/>
                <a href="reeflog.php" class="btn btn-danger updated border">Back</a>

            </form>
        </div>
    </div>
</section>
</body>
</html>
