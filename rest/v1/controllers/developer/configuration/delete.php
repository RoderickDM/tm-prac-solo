<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$configuration = new Configuration($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("configurationId", $_GET)) {
    // get data
    $configuration->configuration_aid = $_GET['configurationId'];
    checkId($configuration->configuration_aid);

    $query = checkDelete($configuration);
    returnSuccess($configuration, "Configuration", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
