#!/usr/bin/env bash

# Our test suite needs our web server to be running in order for it work.
#
# This script:
#
# - starts a server
# - runs our tests against it
# - stops the server
#
# We need to be able to do all these steps via a single command so that
# GitHub Actions (where we're running our Continuous Integration) can
# run the tests properly.

# We're running it on a port that won't clash with the default port,
# that could already be in use if we're running the server locally.
#
export PORT=8081

# Start a server (which knows to check the value of PORT)
#
# Note the "&" at the end of the command will cause it to run "in the
# background", which will allow the rest of this script to carry on
# running while the server starts up.
deno task dev &

# Give the server a split second to get ready, then run the tests.
#
# Note that our tests also check the value of PORT, to work out which
# server to connect to.
sleep 0.5
deno test --allow-all

# We need to know whether those tests passed so we can report it to
# GitHub Actions, so we'll capture the "exit code" of the last command.
# The previous command's exit code is stored in the "?" variable.
PASSED=$?

# Get the process ID of the server, then kill it
PID="$(lsof -t -i :$PORT)"
kill "$PID"

# Report whether the tests passed or failed (GitHub Actions checks this
# script's exit status to decide whether the build should go red, or green)
exit $PASSED
