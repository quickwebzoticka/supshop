<?php
$sol = "ufsfxxx";
$PASSWORD = $_POST["PASSWORD"];
$LOGIN = $_POST["LOGIN"];
$str = $LOGIN.$sol.$PASSWORD;
$massData = [ "USERID" => time(), "TOKEN" => md5($str) ];
echo json_encode($massData);