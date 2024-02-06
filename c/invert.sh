#!/bin/bash
# Invert index to create a mapping from terms to URLs containing that term
# The details of the index structure can be seen in the test cases

url="$1"

# Read from standard input, sort the n-grams, count unique occurrences, and format the output
awk -v url="$url" '{
    gsub(/\t/, " ");
    
    gsub(/^ +| +$/, "");
    count[$0]++;
}
END {
    # Output the counted n-grams in the expected format
    for (ngram in count) {
        # Split ngram back into its parts for proper URL appending
        n = split(ngram, parts, " ");
        printf "%s", parts[1];
        for(i=2; i<=n; i++) {
            printf " %s", parts[i];
        }
        printf " | %d | %s\n", count[ngram], url;
    }
}' | awk -F ' \\| ' '{print $1 "|" $2 "|" $3}' "$filename" | 
sort -t '|' -k1,1 |
awk -F '|' '{print $1 " | " $2 " | " $3}' 
# | tee invert_output.txt