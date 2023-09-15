<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/developer/installation/installation.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$installation = new Installation($conn);
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
if (empty($_GET)) {
    // check data
    checkPayload($data);
    //get task id from query string
    $installation->installation_search = checkIndex($data ,"search");
    $query = checkSearch ($installation);
    http_response_code(200);
    getQueriedData($query);
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
