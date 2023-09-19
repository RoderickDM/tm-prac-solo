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
    // check data
    checkPayload($data);
    // get data
    $cloud->cloud_aid = $_GET['cloudId'];
    $cloud->cloud_title = checkIndex($data, "cloud_title");
    $cloud->cloud_description = checkIndex($data, "cloud_description");
    $cloud->cloud_updated_at = date("Y-m-d H:i:s");
    checkId($cloud->cloud_aid);
    // update
    $query = checkUpdate($cloud);
    returnSuccess($cloud, "Cloud", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
