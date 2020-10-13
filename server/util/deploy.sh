#!/bin/bash

# check for local changes
if [[ `git status --porcelain` ]];
then
  echo "You currently have changes in your local repository."
  exit 1
else
  echo "No detected changes in repository"
fi

# make sure we are on dev branch
`git checkout dev`
`git pull`

# deploy
# `git  `
