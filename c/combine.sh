#!/bin/bash
#
# Combine terms to create  n-grams (for n=1,2,3) and then count and sort them

tr -s '[:space:]' '\n' |
tee tr_output.txt |
awk '{
    print $1;
    if(NR>1) printf "%s %s\n", last, $1;
    if(NR>2) printf "%s %s %s\n", lastlast, last, $1;
    lastlast = last;
    last = $1;
}' | tee awk_output.txt |
sort -dn |
tee combine_output.txt