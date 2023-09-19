<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$toolsEngagement = new ToolsEngagement($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("toolsEngagementId", $_GET)) {
    // get data
    $toolsEngagement->tools_engagement_aid  = $_GET['toolsEngagementId'];
    checkId($toolsEngagement->tools_engagement_aid );

    $query = checkDelete($toolsEngagement);
    returnSuccess($toolsEngagement, "ToolsEngagement", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
