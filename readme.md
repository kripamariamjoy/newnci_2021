## Pre-requisites:
1) Create a metamask account
2) Create an infura account
3) Create account in docker
4) Download Visual Studio Code, node.js
### Step 1: 
       Download the project from github: "https://github.com/kripamariamjoy/newnci_2021"

## Step 2:
1. Copy and paste the code 20217986kripa.sol provided in GitHub repository (To creates contract) in Remix

2. Compile the 20217986kripa.sol by selecting 0.8.0+commit.c7dfd78e and click on "Complie" button

3. Before proceeding further make sure that your matamask is connected and running.

4. In MetaMask select network as 'Ropsten Test Network'

5. Now, Deploy it on Ropsten testnet by selecting environment as "Injected Web3" and selct the contract as "ERC20" and click deploy button

6. Once contract is deployed you will see a link in terminal click on the link to view deployed contract.

7. Now, click on intract with (to) address to publish your contract (To verify that your contract does not have any malicious code)
## step 2: Node.js Code pre-requisite
To install the dependencies below;
   "big-number",
    "dotenv"
    "ethereumjs-tx",
    "ethereumjs-wallet"
    "express",
    "fs",
    "keccak256",
    "npm",
    "web3" 

Use the command below;
 
  $npm install packagename  
  
  (Install all the required dependencies from package.json and package-lock.json)

### step 3: Change the following things in  distribute.js, transfer.js, method.js and contract.js file 
                 a.OwnerAddresses (Account address is your ropsten testnet account1 address/metamask address i.e contract owner address)
                 b. Private key (Private key with your Ropsten testnet account1 private key)
                 c. contract address (Contract Addresss with your deployed Remix code contract address)
                 d. Infura ropsten url (Infura ropsten URL with your Infura procject with endpoint Ropsten)

### Step 4: To deploy contract

$node contract.js

### Now to start transferring token using:
 
$node method.js

To Distribute your token to 10 accounts for 5 % each
$node distribute.js

To transfer token with rest api by running halndler.js

 $node handler.js
     or
 $curl -XPOST http://localhost:8080/transfer

To transfer the token from contract to metamask
$node transfer.js

### Step :5
Pre-requist:
 1) Create a Docker account and create a repository

Create and Deploy Docker image

1. build docker container
   $docker build -t [user/tag] .
   eg. $docker build -t 20217986k/lab2021 .

2. Check for the docker image
   $docker image

3. For cheking running container
   $docker ps

4. To run docker image

   $docker run -p 8090:8080 --name nci1 -d 20217986k/lab2021

5. To see the docker images
     $docker image ls
6. To start already existing image
$docker start container_name
 eg:$ docker start nci1

7. To push docker image
   $docker push 20217986k/lab2021:latest

   #### Link to this image: https://hub.docker.com/repository/docker/20217986k/lab2021