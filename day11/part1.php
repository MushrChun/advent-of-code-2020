<?php
$content = file_get_contents("./input.txt", true);

$arr = array_map(function($str){
    return str_split($str);
}, explode(PHP_EOL, $content));

// echo "before: ", var_export($arr), PHP_EOL;

$pre = 0;

function apply($arr){
    $stats =0;

    $outcome = array();

    for($row = 0; $row<count($arr); $row++){
        $rowArr = array();
        for($col =0; $col<count($arr[0]); $col++){
            if($arr[$row][$col] == 'L') {
                if(     $arr[$row-1][$col-1] !='#' 
                    and $arr[$row-1][$col  ] !='#' 
                    and $arr[$row-1][$col+1] !='#' 
                    and $arr[$row  ][$col-1] != '#' 
                    and $arr[$row  ][$col+1] != '#' 
                    and $arr[$row+1][$col-1] != '#' 
                    and $arr[$row+1][$col  ] !='#' 
                    and $arr[$row+1][$col+1] !='#'
                ){
                    array_push($rowArr, '#');
                    $stats++;
                }else{
                    array_push($rowArr, 'L');
                }
            }
            else if($arr[$row][$col] == '#') {
                $count = 0;
                if($arr[$row-1][$col-1] == '#') $count++;
                if($arr[$row-1][$col] == '#') $count++;
                if($arr[$row-1][$col+1] == '#') $count++;
                if($arr[$row][$col-1] == '#') $count++;
                if($arr[$row][$col+1] == '#') $count++;
                if($arr[$row+1][$col-1] == '#') $count++;
                if($arr[$row+1][$col] == '#') $count++;
                if($arr[$row+1][$col+1] == '#') $count++;
    
                if($count>=4){
                    array_push($rowArr, 'L');
                }else{
                    array_push($rowArr, '#');
                    $stats++;
                }
            }
            else{
                array_push($rowArr, '.');
            }
        }

        array_push($outcome, $rowArr);
    }

    return [ $outcome, $stats ];
}

$outcome = $arr;

$i = 0;

while(true) {
    echo "loop: ", $i, PHP_EOL;

    [ $outcome, $stats ] = apply($outcome);

    if($pre == $stats) break;
    else $pre = $stats;

    $i++;
}


echo "pre: ", $pre, PHP_EOL;
