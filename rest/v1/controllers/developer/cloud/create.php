<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$cloud = new Cloud($conn);
// get should not be present
if (array_key_exists("cloudId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$cloud->cloud_title = checkIndex($data, "cloud_title");
$cloud->cloud_description = checkIndex($data, "cloud_description");

$cloud->cloud_is_active = 1;
$cloud->cloud_created_at = date("Y-m-d H:i:s");
$cloud->cloud_updated_at = date("Y-m-d H:i:s");
// // check name
isNameExist($cloud, $cloud->cloud_title);
// create
$query = checkCreate($cloud);
returnSuccess($cloud, "Cloud", $query);
