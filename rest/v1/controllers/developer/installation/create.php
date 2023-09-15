<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$installation = new Installation($conn);
// get should not be present
if (array_key_exists("installationId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$installation->installation_title = checkIndex($data, "installation_title");
$installation->installation_description = checkIndex($data, "installation_description");

$installation->installation_is_active = 1;
$installation->installation_created_at = date("Y-m-d H:i:s");
$installation->installation_updated_at = date("Y-m-d H:i:s");
// // check name
isNameExist($installation, $installation->installation_title);
// isNameExist($installation, $installation->department_name);
// create
$query = checkCreate($installation);
returnSuccess($installation, "Installation", $query);
