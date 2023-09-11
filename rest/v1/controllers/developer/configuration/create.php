<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$department = new Department($conn);
// get should not be present
if (array_key_exists("departmentId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$department->department_name = checkIndex($data, "department_name");

$department->department_is_active = 1;
$department->department_created = date("Y-m-d H:i:s");
$department->department_datetime = date("Y-m-d H:i:s");
// // check name
// isNameExist($department, $department->department_name);
// create
$query = checkCreate($department);
returnSuccess($department, "Department", $query);
