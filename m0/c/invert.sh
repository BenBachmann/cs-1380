#!/bin/bash
# Invert index to create a mapping from terms to URLs containing that term
# The details of the index structure can be seen in the test cases

url="https://cs.brown.edu/courses/csci1380/sandbox/1/level_1a/index.html"

# Process the input from stdin
awk -v url="$url" '
{
    # For each line, generate unique terms and combinations
    delete terms;
    for (i = 1; i <= NF; i++) {
        for (j = i; j <= NF; j++) {
            term = "";
            for (k = i; k <= j; k++) {
                term = term (k == i ? "" : " ") $k;
            }
            terms[term]++;
        }
    }
    
    # Add the counts to the global associative array
    for (term in terms) {
        counts[term]++;
    }
}

END {
    # Print the results
    for (term in counts) {
        print term " | " counts[term] " | " url;
    }
}
' | sort

