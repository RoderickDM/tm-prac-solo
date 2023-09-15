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
    // get data
    $installation->installation_aid = $_GET['installationId'];
    checkId($installation->installation_aid);

    $query = checkDelete($installation);
    returnSuccess($installation, "Installation", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
