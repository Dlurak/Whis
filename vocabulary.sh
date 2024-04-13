#!/bin/bash

BOLD="\033[32;1m"
RESET="\033[0m"

content=$(cat ./output/words.json)
names=$(echo "$content" | jq "keys.[]" -r)


echo "$names" | while IFS= read -r name; do
	word_count=$(echo "$content" | jq ".\"$name\" | values[]" | wc -l)

	echo -e "$BOLD$name: $RESET$word_count"
done
