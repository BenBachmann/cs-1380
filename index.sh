#!/bin/bash
# index.sh runs the core indexing pipeline

cat "$1" |
  c/process.sh | 
  # tee process_output.txt |
  c/stem.js | 
  # tee stem_output.txt |
  c/combine.sh | 
  # tee combine_output.txt |
  c/invert.sh "$2" | 
  # tee invert_output.txt |
  c/merge.js d/global-index.txt | 
  # tee merge_output.txt |
  sort -o d/global-index.txt
