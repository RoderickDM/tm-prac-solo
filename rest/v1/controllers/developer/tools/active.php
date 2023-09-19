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
if (array_key_exists("toolsId", $_GET)) {
    // check data
    checkPayload($data);
    $tools->tools_aid = $_GET['toolsId'];
    $tools->tools_is_active = trim($data["isActive"]);
    // $tools->department_datetime = date("Y-m-d H:i:s");
    checkId($tools->tools_aid);
    $query = checkActive($tools);
    http_response_code(200);
    returnSuccess($tools, "Tools", $query);
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
