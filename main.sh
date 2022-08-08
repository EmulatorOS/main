#!/bin/bash
# Set this to 1 to automatically attempt a fix when an error occurs while running npm start.
fix=0


# Stuff to do at first run(submodule, npm install).
if [[ -d "static" && -n "$(find static -prune -empty 2>/dev/null)" ]] || [[ ! -d "static" ]]; then
  npm install
  git submodule update --init --recursive
fi
function checkNode {
  local _0
  nodeVersion=$(node -e 'console.log(process.versions.node.split(`.`)[0])')
  "echo" "-e" "Node Version: ""$nodeVersion"
  _0="12"
  if [ $(($nodeVersion < $_0)) == 1 ]; then
    "echo" "-e" "Error: Required Node.js 14"
    "exit" "1"  
fi
  if [ "$nodeVersion" == "12" ]; then
    "echo" "-e" "Warning: NodeJS ""$nodeVersion"" is not tested."  
fi
}
function deb {
  nodeCheck=$(node -v)
  apt --yes update
  if [ "$nodeCheck" != "" ]; then
    "checkNode" 
  else
    # Old nodejs binary name is "nodejs"
    check=$(nodejs --version)
    if [ "$check" != "" ]; then
      "echo" "-e" "Error: 'node' command is not found, but 'nodejs' command is found. Your NodeJS should be too old."
      exit 1    
fi
    curlCheck=$(curl --version)
    if [ "$curlCheck" == "" ]; then
      "echo" "-e" "Installing Curl"
      apt --yes install curl    
fi
    "echo" "-e" "Installing Node.js 14"
    curl -sL https://deb.nodesource.com/setup_14.x | bash - > log.txt
    apt --yes install nodejs
    node -v
    nodeCheckAgain=$(node -v)
    if [ "$nodeCheckAgain" == "" ]; then
      "echo" "-e" "Error during Node.js installation"
      exit 1    
fi
  fi
  check=$(git --version)
  if [ "$check" == "" ]; then
    "echo" "-e" "Installing Git"
    apt --yes install git  
fi
}

npm start "deb"|| [[ $fix = 1 ]] && npm install && npm update && git submodule update --init --recursive