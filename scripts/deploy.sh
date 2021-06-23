# DEPLOYMENT CONFIGURATION
## add a directory called '.ssh'
mkdir -p ~/.ssh
## copy ssh key from environmnet variable to a file 'id_rsa'
echo -e "${SSH_KEY}//_/\\n" > ~/.ssh/id_rsa
## give permitions to this file
chmod 600 ~/.shh/id_rsa
## add umbler host as a known host
ssh-keyscan -p 9922 -t rsa geonosis.deploy.umbler.com 2>&1 >> ~/.ssh/known_hosts