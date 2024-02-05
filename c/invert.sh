#!/bin/bash
# Invert index to create a mapping from terms to URLs containing that term
# The details of the index structure can be seen in the test cases


#!/bin/bash

url="$1"

# Check if an URL was provided
if [ -z "$url" ]; then
    echo "Usage: $0 <url>"
    exit 1
fi

# Read from standard input, sort the n-grams, count unique occurrences, and format the output
awk -v url="$url" '{
    # Remove leading and trailing spaces and count n-grams
    gsub(/^ +| +$/, "");
    count[$0]++;
}
END {
    # Output the counted n-grams in the expected format
    for (ngram in count) {
        print ngram " | " count[ngram] " | " url;
    }
}' | sort | tee invert_output.txt
