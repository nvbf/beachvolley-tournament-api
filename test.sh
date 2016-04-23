#!/bin/sh


./node_modules/.bin/babel-node test.js &

## Grab PID of background process
PPID=$!
echo "Node.js app launching on PID: ${NODE_PID}.  Starting tests in 2 seconds."

## Give about 2 sec for the node process to completely startup
sleep 2

./node_modules/.bin/mocha --compilers js:babel-core/register -u tdd "*-test.js"
RETURN_VALUE=$?

## Kill background node process and childs
for i in `ps -ef| awk '$3 == '${PPID}' { print $2 }'`
do
echo killing $i
kill -9 $i
done
kill $PPID

exit $RETURN_VALUE
