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
    // check data
    checkPayload($data);
    // get data
    $toolsEngagement->tools_engagement_aid = $_GET['toolsEngagementId'];
    $toolsEngagement->tools_engagement_id = checkIndex($data, "tools_engagement_id");
    $toolsEngagement->tools_engagement_name = checkIndex($data, "tools_engagement_name");
    $toolsEngagement->tools_engagement_description = checkIndex($data, "tools_engagement_description");
    $toolsEngagement->tools_engagement_updated_at = date("Y-m-d H:i:s");
    checkId($toolsEngagement->tools_engagement_aid);
    // update

    //isNameExist($toolsEngagement, $toolsEngagement->tools_engagement_name);
    $query = checkUpdate($toolsEngagement);
    returnSuccess($toolsEngagement, "ToolsEngagement", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
