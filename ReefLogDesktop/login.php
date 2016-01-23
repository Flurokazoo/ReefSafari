<?php
require_once "config.php";
session_start();


if (isset($_POST['login'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $query = "SELECT id, email, password FROM user WHERE email = '" . $email . "' AND password = '" . $password . "'";
    $results = mysqli_query($connect, $query);
    $numberRows = mysqli_num_rows($results);

    if ($numberRows == 0) {
        header("Location: login.php?error=wrong");
        exit;
    } elseif ($numberRows > 0) {
        $id = mysqli_fetch_assoc($results);
        $userId = $id['id'];
        $_SESSION['id'] = $userId;
        header('location: index.php');
        exit;
    }
}


$error = '';
if (isset($_GET['error'])) {
    $errorMessage = $_GET['error'];
    switch ($errorMessage) {
        case 'wrong';
            $error = '<div class="alert alert-danger" role="alert">
                         <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                         <span class="sr-only">Error:</span>
                         The email password combination is incorrect.
                      </div>';
            break;
        case 'login';
            $error = '<div class="alert alert-danger error" role="alert">
                         <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                         <span class="sr-only">Error:</span>
                         You have to login to view this page
                      </div>';
            break;
        default;
            null;
            break;
    }

}

mysqli_close($connect);

?>

    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link href='https://fonts.googleapis.com/css?family=Ubuntu:500italic,500' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="assets/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="assets/css/style.css">
        <title>Login</title>
    </head>
    <body>

    <section class="body-section">
        <div class="col-lg-4">
            <div id="reeflog-logo" class="col-lg-6">
                <h1><span class="yellow-text">Reef</span><span
                            class="white-text italic-text">Log</span></h1>
            </div>
        </div>
        <div class="col-lg-4">

        </div>
        <div id="login-container" class="col-lg-8">
            <form action="" method="post" class="col-md-6 .col-md-offset-3">
                <?= $error ?>
                    <label for="email" class="white-text">E-Mail:</label>
                    <input type="email" name="email" id="email" class="form-control border"/>
                <br>
                    <label for="password" class="white-text">Password:</label>
                    <input type="password" name="password" id="password" class="form-control border"/>

                <input type="submit" name="login" value="Login" class="btn btn-success login border"/>
            </form>
        </div>
    </section>


    </body>
    </html>
<?php require_once "footer.php"; ?>