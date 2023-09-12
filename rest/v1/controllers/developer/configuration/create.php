<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$configuration = new Configuration($conn);
// get should not be present
if (array_key_exists("configurationId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$configuration->configuration_title = checkIndex($data, "configuration_title");
$configuration->configuration_description = checkIndex($data, "configuration_description");

$configuration->configuration_is_active = 1;
$configuration->configuration_created_at = date("Y-m-d H:i:s");
$configuration->configuration_updated_at = date("Y-m-d H:i:s");
// // check name
// isNameExist($configuration, $configuration->department_name);
// create
$query = checkCreate($configuration);
returnSuccess($configuration, "Configuration", $query);
