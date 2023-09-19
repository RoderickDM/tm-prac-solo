<?php
// set http header
require '../../../../../../core/header.php';
// use needed functions
require '../../../../../../core/functions.php';
// use needed classes
require '../../../../../../models/developer/tools/Engagement.php';
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
if (array_key_exists("start", $_GET)) {
    // check data
    checkPayload($data);
    $toolsEngagement->tools_engagement_start = $_GET['start'];
    $toolsEngagement->tools_engagement_total = 4;
    checkLimitId($toolsEngagement->tools_engagement_start, $toolsEngagement->tools_engagement_total);
    
    $query = checkReadLimit($toolsEngagement);
    $total_result = checkReadAll($toolsEngagement);
    http_response_code(200);
    checkReadQuery(
        $query,
        $total_result,
        $toolsEngagement->tools_engagement_start,
        $toolsEngagement->tools_engagement_total,
    );
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
