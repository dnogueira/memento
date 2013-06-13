<?php
header("Content-Type:application/json");

//sleep(1);
$posi = (int) $_REQUEST['posi'];
$posf = (int) $_REQUEST['posf'];

$count = 600;

 

$result = array(
//    'count' => $count,
//    "range_min" => $posi,
//    "range_max" => $posf,
    'items' => array()
);

for ($i = $posi; $i <= $posf  &&  $i < $count; $i++) {
    
    $icon = $i % 7;
    
    $result['items'][] = array(
        "icon" => "$icon.png",
        "col1" => $i,
        "col2" => $i,
        "col3" => $i,
        "col4" => $i
    );
}
echo json_encode($result);
