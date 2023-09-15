<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/developer/installation/Installation.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$installation = new Installation($conn);
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key 
if (array_key_exists("installationId", $_GET)) {
    // check data
    checkPayload($data);
    $installation->installation_aid = $_GET['installationId'];
    $installation->installation_is_active = trim($data["isActive"]);
    // $installation->department_datetime = date("Y-m-d H:i:s");
    checkId($installation->installation_aid);
    $query = checkActive($installation);
    http_response_code(200);
    returnSuccess($installation, "Installation", $query);
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
