<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$tools = new Tools($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("toolsId", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    $tools->tools_aid = $_GET['toolsId'];
    $tools->tools_title = checkIndex($data, "tools_title");
    $tools->tools_description = checkIndex($data, "tools_description");
    $tools->tools_updated_at = date("Y-m-d H:i:s");
    checkId($tools->tools_aid);
    // update

    isNameExist($tools, $tools->tools_title);
    $query = checkUpdate($tools);
    returnSuccess($tools, "Tools", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
