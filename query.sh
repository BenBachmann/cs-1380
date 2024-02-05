#!/bin/bash

# Provided an appropriate index, the query could be implemented using grep
# along  with appropriate stemming of the input strings and stripping of the 
# index metadata

# echo "$@" | cat

term=$1

grep "$term" d/global-index.txt | tee query_output.txt
# sort