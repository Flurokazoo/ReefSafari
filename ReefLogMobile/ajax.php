<?php
require_once "config.php";
$action = $_GET['action'];
session_start();
$userId = $_SESSION['id'];

switch ($action) {
    case 'getEntries':
        $query = "SELECT `name`, `entry`.id, `year`, `month`, `day`, `avatarThumbnail` FROM `entry` INNER JOIN `coral` ON `entry`.coralId =`coral`.id WHERE `userId` = " . $userId . " AND `status` = 1 ORDER BY `entry`.id DESC;";
        getQuery($query, $connect);
        break;
    case 'searchEntries':
        $searchTerm = $_GET['keyWord'];
        $hashTagSearch = '#';
        if ($searchTerm[0] == $hashTagSearch) {
            //Hashtag search
            $query = "SELECT `name`, `entry`.id, `coralId`, `year`, `month`, `day`, `avatarThumbnail` FROM `entry` INNER JOIN `coral` ON `entry`.coralId =`coral`.id WHERE `userId` = " . $userId . " AND `status` = 1 AND `description` LIKE '%" . $searchTerm . "%'  ORDER BY `entry`.id DESC;";
        } else {
            //Coral search
            $query = "SELECT `name`, `entry`.id, `coralId`, `year`, `month`, `day`, `avatarThumbnail` FROM `entry` INNER JOIN `coral` ON `entry`.coralId =`coral`.id WHERE `userId` = " . $userId . " AND `status` = 1 AND `name` LIKE '%" . $searchTerm . "%'  ORDER BY `entry`.id DESC;";
        }
        getQuery($query, $connect);
        break;
    case 'getEntryInfo':
        $entryId = $_GET['entryId'];
        $query = "SELECT `name`, `entry`.id, `coralId`, `year`, `month`, `day`, `avatar`, `coralDescription`, `description`, `rarity`, `venomous` FROM `entry` INNER JOIN `coral` ON `entry`.coralId =`coral`.id WHERE `entry`.id = " . $entryId;
        getQuery($query, $connect);
        break;
    case 'editEntry':
        $entryId = $_GET['entryId'];
        $description = $_GET['description'];
        $query = "UPDATE `entry` SET `description` = '" . $description . "' WHERE `id` = " . $entryId;
        mysqli_query($connect, $query);
        echo json_encode(["Edit success"]);
        break;
    case 'deleteEntry':
        $entryId = $_GET['entryId'];
        $query = "DELETE FROM `entry` WHERE `id` = " . $entryId;
        mysqli_query($connect, $query);
        echo json_encode(["Delete success"]);
        break;
    case 'getReviewEntries':
        $query = "SELECT `name`, `entry`.id, `year`, `month`, `day`, `avatarThumbnail` FROM `entry` INNER JOIN `coral` ON `entry`.coralId =`coral`.id WHERE `userId` = " . $userId . " AND `status` = 0 ORDER BY `entry`.id DESC;";
        getQuery($query, $connect);
        break;
}

function getQuery($query, $connect)
{
    $results = mysqli_query($connect, $query);
    $resultArray = [];

    while ($row = mysqli_fetch_assoc($results)) {
        $resultArray[] = $row;
    }
    echo json_encode($resultArray);
    exit;
}