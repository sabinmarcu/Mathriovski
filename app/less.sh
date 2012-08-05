#!/bin/bash

while true; do
	echo "Compiling styles"
	lessc styles/styles.less >> styles/styles.css
	sleep 1
done
