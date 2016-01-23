<?php
require_once "config.php";

$query = "SELECT * FROM `entry` WHERE `id` = 33";
$results = mysqli_query($connect, $query);

$row = mysqli_fetch_object($results);
$avatar = $row->avatar;
$avatarThumbnail = $row->avatarThumbnail;
?>

<img src="<?=$avatar?>">
<br>
<img src="<?=$avatarThumbnail?>">
