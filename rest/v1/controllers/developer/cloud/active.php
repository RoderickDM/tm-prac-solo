<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/developer/cloud/cloud.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$cloud = new Cloud($conn);
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key 
if (array_key_exists("cloudId", $_GET)) {
    // check data
    checkPayload($data);
    $cloud->cloud_aid = $_GET['cloudId'];
    $cloud->cloud_is_active = trim($data["isActive"]);
    // $cloud->department_datetime = date("Y-m-d H:i:s");
    checkId($cloud->cloud_aid);
    $query = checkActive($cloud);
    http_response_code(200);
    returnSuccess($cloud, "Cloud", $query);
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
