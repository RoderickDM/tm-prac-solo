<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/developer/tools/Tools.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$tools = new Tools($conn);
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key 
if (array_key_exists("start", $_GET)) {
    // check data
    checkPayload($data);
    $tools->tools_start = $_GET['start'];
    $tools->tools_total = 4;
    checkLimitId($tools->tools_start, $tools->tools_total);
    
    $query = checkReadLimit($tools);
    $total_result = checkReadAll($tools);
    http_response_code(200);
    checkReadQuery(
        $query,
        $total_result,
        $tools->tools_start,
        $tools->tools_total,
    );
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
