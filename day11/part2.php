<?php
$content = file_get_contents("./input.txt", true);

$arr = array_map(function ($str) {
    return str_split($str);
}, explode(PHP_EOL, $content));


$pre = 0;

function check($arr, $row, $r_offset, $col, $c_offset, $target)
{
    $row += $r_offset;
    $col += $c_offset;
    while ($row >= 0 and $col >= 0 and $row < count($arr) and $col < count($arr[0])) {
        if ($arr[$row][$col] == $target) return false;
        else if ($arr[$row][$col] == 'L') return true;
        $row += $r_offset;
        $col += $c_offset;
    }
    return true;
}

function apply($arr)
{
    $stats = 0;

    $outcome = array();

    for ($row = 0; $row < count($arr); $row++) {
        $rowArr = array();
        for ($col = 0; $col < count($arr[0]); $col++) {
            if ($arr[$row][$col] == 'L') {
                if (
                    check($arr, $row, -1, $col, -1, '#')
                    and check($arr, $row, -1, $col,  0, '#')
                    and check($arr, $row, -1, $col, +1, '#')
                    and check($arr, $row,  0, $col, -1, '#')
                    and check($arr, $row,  0, $col, +1, '#')
                    and check($arr, $row, +1, $col, -1, '#')
                    and check($arr, $row, +1, $col,  0, '#')
                    and check($arr, $row, +1, $col, +1, '#')
                ) {
                    array_push($rowArr, '#');
                    $stats++;
                } else {
                    array_push($rowArr, 'L');
                }
            } else if ($arr[$row][$col] == '#') {
                $count = 0;
                if (!check($arr, $row, -1, $col, -1, '#')) $count++;
                if (!check($arr, $row, -1, $col,  0, '#')) $count++;
                if (!check($arr, $row, -1, $col, +1, '#')) $count++;
                if (!check($arr, $row,  0, $col, -1, '#')) $count++;
                if (!check($arr, $row,  0, $col, +1, '#')) $count++;
                if (!check($arr, $row, +1, $col, -1, '#')) $count++;
                if (!check($arr, $row, +1, $col,  0, '#')) $count++;
                if (!check($arr, $row, +1, $col, +1, '#')) $count++;

                if ($count >= 5) {
                    array_push($rowArr, 'L');
                } else {
                    array_push($rowArr, '#');
                    $stats++;
                }
            } else {
                array_push($rowArr, '.');
            }
        }

        array_push($outcome, $rowArr);
    }

    return [$outcome, $stats];
}

$outcome = $arr;

// echo "before outcome: ", var_export($outcome), PHP_EOL;

$i = 1;

while (true) {
    echo "loop: ", $i, PHP_EOL;

    [$outcome, $stats] = apply($outcome);

    if ($pre == $stats) break;
    else $pre = $stats;

    $i++;
}


echo "pre: ", $pre, PHP_EOL;
