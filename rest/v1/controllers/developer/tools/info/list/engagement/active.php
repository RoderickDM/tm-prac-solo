<?php
// set http header
require '../../../../../core/header.php';
// use needed functions
require '../../../../../core/functions.php';
// use needed classes
require '../../../../../models/developer/tools/Engagement.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$toolsEngagement = new ToolsEngagement($conn);
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key 
if (array_key_exists("toolsEngagementId", $_GET)) {
    // check data
    checkPayload($data);
    $toolsEngagement->tools_engagement_aid = $_GET['toolsEngagementId'];
    $toolsEngagement->tools_engagement_is_active = trim($data["isActive"]);
    // $toolsEngagement->department_datetime = date("Y-m-d H:i:s");
    checkId($toolsEngagement->tools_engagement_aid);
    $query = checkActive($toolsEngagement);
    http_response_code(200);
    returnSuccess($toolsEngagement, "ToolsEngagement", $query);
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
