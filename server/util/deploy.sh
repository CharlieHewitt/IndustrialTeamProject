#!/bin/bash

# move to root

while [[ $PWD != '/' && ${PWD##*/} != 'IndustrialTeamProject' ]]; do cd ..; done

# check for local changes
if [[ `git status --porcelain` ]];
then
  echo "You currently have changes in your local repository."
  echo "Aborting deploy."
  exit 1
else
  echo "No detected changes in repository"
fi

echo "Swapping to dev branch ..."
`git checkout dev` || echo "Aborting deploy." && exit 2

echo "Pulling from remote for updates ..."
`git pull` || echo "Aborting deploy." && exit 2

echo "Attempting to deploy ..."
`git subtree push --prefix server origin deploy-backend` || echo "Aborting deploy." && exit 3

echo "Deployment successful"
exit 0