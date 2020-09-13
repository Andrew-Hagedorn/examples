#!/bin/sh

# assumes you have apache ab installed;  this is not a perfect test since they are
# running on the same machine and potentially competing for the same resources
# but it gives a directional look at how the event loop performs

mkdir data || echo 'directory already there'

npm run start &
PID=$!

sleep 5

testRendering () {
   CONCURRENCY=$1
   URL=$2
   echo "********************************"
   echo "Running test with concurrency of $CONCURRENCY on http://localhost:7000/$URL"
   ab -n 1000 -c $CONCURRENCY http://localhost:7000/$URL > ./data/processing-$URL-$CONCURRENCY.txt
   curl http://localhost:7000/save-event-loop-data?file=processing-$URL-$CONCURRENCY
   echo "********************************"
}

CURRENT_URL=render-to-string
testRendering 1 $CURRENT_URL
testRendering 5 $CURRENT_URL
testRendering 10 $CURRENT_URL
testRendering 15 $CURRENT_URL
testRendering 20 $CURRENT_URL
testRendering 25 $CURRENT_URL
testRendering 50 $CURRENT_URL
testRendering 100 $CURRENT_URL

CURRENT_URL=render-to-stream
testRendering 1 $CURRENT_URL
testRendering 5 $CURRENT_URL
testRendering 10 $CURRENT_URL
testRendering 15 $CURRENT_URL
testRendering 20 $CURRENT_URL
testRendering 25 $CURRENT_URL
testRendering 50 $CURRENT_URL
testRendering 100 $CURRENT_URL

CURRENT_URL=render-in-worker
testRendering 1 $CURRENT_URL
testRendering 5 $CURRENT_URL
testRendering 10 $CURRENT_URL
testRendering 15 $CURRENT_URL
testRendering 20 $CURRENT_URL
testRendering 25 $CURRENT_URL
testRendering 50 $CURRENT_URL
testRendering 100 $CURRENT_URL

kill $PID