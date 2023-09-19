<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$toolsEngagement = new ToolsEngagement($conn);
// get should not be present
if (array_key_exists("toolsEngagementId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$toolsEngagement->tools_engagement_id = checkIndex($data, "tools_engagement_id");
$toolsEngagement->tools_engagement_name = checkIndex($data, "tools_engagement_name");
$toolsEngagement->tools_engagement_description = checkIndex($data, "tools_engagement_description");

$toolsEngagement->tools_engagement_is_active = 1;
$toolsEngagement->tools_engagement_created_at = date("Y-m-d H:i:s");
$toolsEngagement->tools_engagement_updated_at = date("Y-m-d H:i:s");
// // check name
isNameExist($toolsEngagement, $toolsEngagement->tools_engagement_name);
// isNameExist($tools, $tools->department_name);
// create
$query = checkCreate($toolsEngagement);
returnSuccess($toolsEngagement, "ToolsEngagement", $query);
