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
    // check data
    checkPayload($data);
    // get data
    $configuration->configuration_aid = $_GET['configurationId'];
    $configuration->configuration_title = checkIndex($data, "configuration_title");
    $configuration->configuration_description = checkIndex($data, "configuration_description");
    $configuration->configuration_updated_at = date("Y-m-d H:i:s");
    checkId($configuration->configuration_aid);
    // update
    $query = checkUpdate($configuration);
    returnSuccess($configuration, "Configuration", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
