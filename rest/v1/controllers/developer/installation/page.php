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
if (array_key_exists("start", $_GET)) {
    // check data
    checkPayload($data);
    $installation->installation_start = $_GET['start'];
    $installation->installation_total = 4;
    checkLimitId($installation->installation_start, $installation->installation_total);
    
    $query = checkReadLimit($installation);
    $total_result = checkReadAll($installation);
    http_response_code(200);
    checkReadQuery(
        $query,
        $total_result,
        $installation->installation_total,
        $installation->installation_start,
    );
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
