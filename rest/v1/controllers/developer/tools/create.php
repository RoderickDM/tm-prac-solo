<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$tools = new Tools($conn);
// get should not be present
if (array_key_exists("toolsId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$tools->tools_title = checkIndex($data, "tools_title");
$tools->tools_description = checkIndex($data, "tools_description");

$tools->tools_is_active = 1;
$tools->tools_created_at = date("Y-m-d H:i:s");
$tools->tools_updated_at = date("Y-m-d H:i:s");
// // check name
isNameExist($tools, $tools->tools_title);
// isNameExist($tools, $tools->department_name);
// create
$query = checkCreate($tools);
returnSuccess($tools, "Tools", $query);
