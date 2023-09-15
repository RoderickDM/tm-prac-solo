<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$installation = new Installation($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("installationId", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    $installation->installation_aid = $_GET['installationId'];
    $installation->installation_title = checkIndex($data, "installation_title");
    $installation->installation_description = checkIndex($data, "installation_description");
    $installation->installation_updated_at = date("Y-m-d H:i:s");
    checkId($installation->installation_aid);
    // update

    isNameExist($installation, $installation->installation_title);
    $query = checkUpdate($installation);
    returnSuccess($installation, "Installation", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
