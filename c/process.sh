#!/bin/bash
# process text to convert it to maintain one word per 
# line, convert it to lowercase ascii, and remove any stopwords 
# useful commands: tr, iconv, grep

tr -cs A-Za-z '\n' | iconv -f UTF-8 -t ASCII//TRANSLIT | tr 'A-Z' 'a-z' | grep -vwFf d/stopwords.txt 
# | tee grep_output.txt
# TODO replace `cat` more code...

# echo -e "a /n 678 /n b" | grep -vwFf d/stopwords.txt