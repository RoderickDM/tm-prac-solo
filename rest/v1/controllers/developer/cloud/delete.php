<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$cloud = new Cloud($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("cloudId", $_GET)) {
    // get data
    $cloud->cloud_aid = $_GET['cloudId'];
    checkId($cloud->cloud_aid);

    $query = checkDelete($cloud);
    returnSuccess($cloud, "Cloud", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
