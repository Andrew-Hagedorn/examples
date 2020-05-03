#!/bin/sh

# assumes you have apache ab installed;  this is not a perfect test since they are
# running on the same machine and potentially competing for the same resources
# but it gives a directional look at how the event loop performs

mkdir data || echo 'directory already there'

node index.js &
PID=$!

sleep 2

testWithDelay () {
   DELAY=$1
   echo "********************************"
   echo "Running test with delay of $DELAY"
    ab -n 1000 -c 10 http://localhost:7000/processing?delay=$DELAY > ./data/processing-$DELAY.txt
    curl http://localhost:7000/save-event-loop-data?file=processing-$DELAY
   echo "********************************"
}


ab -n 10000 -c 10 http://localhost:7000/no-processing > ./data/processing-0.txt
curl http://localhost:7000/save-event-loop-data?file=processing-0

testWithDelay 5
testWithDelay 10
testWithDelay 25
testWithDelay 50
testWithDelay 100
testWithDelay 200

kill $PID