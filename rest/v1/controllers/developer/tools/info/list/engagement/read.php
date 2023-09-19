<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$toolsEngagement = new ToolsEngagement($conn);
// get $_GET data 

if (array_key_exists("toolsEngagementId", $_GET) ) {
    $toolsEngagement->tools_engagement_aid = $_GET['toolsEngagementId'];
    checkId($toolsEngagement->tools_engagement_aid);
    $query = checkReadById($toolsEngagement);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($toolsEngagement);
    http_response_code(200);
    getQueriedData($query);
     
}

// return 404 error if endpoint not available
checkEndpoint();
