<?php

/*
 * get an integer as input (n) and print a 
 * n levels pyramid to the terminal
 */

$len = (int)$argv[1];

$out = [];
for ($i = 1; $i <= $len; $i++){

    $hash = array_fill($len-$i, $i, "#");
    $space = array_fill(0, $len - 1, " ");
    
    $side1 = array_replace($space, $hash);
    $side2 = array_reverse($side1);

    $out[] = sprintf("%s    %s", implode(" ", $side1), implode(" ", $side2));

}

echo implode("\n\r", $out);
