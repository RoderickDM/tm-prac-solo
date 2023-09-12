<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/developer/configuration/Configuration.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$configuration = new Configuration($conn);
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key 
if (array_key_exists("configurationId", $_GET)) {
    // check data
    checkPayload($data);
    $configuration->configuration_aid = $_GET['configurationId'];
    $configuration->configuration_is_active = trim($data["isActive"]);
    // $configuration->department_datetime = date("Y-m-d H:i:s");
    checkId($configuration->configuration_aid);
    $query = checkActive($configuration);
    http_response_code(200);
    returnSuccess($configuration, "Configuration", $query);
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
