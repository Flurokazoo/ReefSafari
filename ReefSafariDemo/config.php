<?php
$db_host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_database = 'reeflog';

$connect = mysqli_connect($db_host, $db_user, $db_password, $db_database);

function isLoggedIn()
{
    if (!isset($_SESSION['id'])) {
        header('Location: login.php?error=login');
    }
}
?>