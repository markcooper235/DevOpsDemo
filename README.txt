# DevOpsDemo
Demo Created to Show case An Interview Agile Story.

Deployment Setup
1. Install AWS CLI
  a. Install Python 2.7+
  b. pip install awscli --upgrade --user
  c. Configure an IAM User in your AWS Account
    1. Create a ElasticBeanStalkDeploy   Group
    2. Grant it the AWSElasticBeanstalkFullAccess Policy
    3. Create A eb_deploy_user 
    4. Place the user in the the ElasticBeanStalkDeploy Group
    5. Make sure to record, and keep safe the Access Key ID, and Security Token (Note: It can not be retrieved later)
  d. Configure the AWS CLI Client
    1. aws configure  --profile eb_deploy_user    (Note: keep the Acess Key ID Handy)
       a. Set the Access Key ID
       b Set the Access Token
       c. Set the Region:  Set mine to "us-east-1"
       d. Set the Output Type: Set mine to "Json"
       
       aws Profile: .aws/config
        [profile eb_deploy_user]
        output = json
        region = us-east-1
       
       Creds will be:  .aws/Credentials 
    2. Install AWS EB CLI Tool
       a. pip install awsebcli --upgrade --user
       
    3. Configure the EB CLI Tool: eb init --profile eb_deploy_user
       a. Select Default Region: Set mine to "us-east-1"
       b. Select an application to use: Select "Create new Application"  (This will be the default unless you have other EB Applications)
       c. Enter Application Name:  Set mine to "mcooper_ip_list_app"
       d. It appears you are using Node.js. Is this correct?: "Y"   (EB Detects the type of project you have by looking at your code)
       e. Do you wish to continue with CodeCommit?: "N"   (I choose to use GitHub)
       f. Do you want to set up SSH for your instances?: "Y"
       g. Select a keypair. "Create new KeyPair"  Called mine "eb_deploy_user"
     
    4. Create the EB Development Env:  eb create dev
        Note: This step takes several minutes.  16 mins in my case.
        
        Note:  With a NodeJS Express web Application the Create will Fail, due to the Starting command Not being Standard with Express                  Apps.   EB (expects to run node app.js)  Needs to be switched to "npm start"
     5. Go to the EB console and select your App, and its Env:  in my case "mcooper_ip_list_app" and "mcooper_ip_list_app_dev"
        respectfully.
     6. Select Configuration -> Software -> Modify:   Set Node Command to: "npm start"  Select "Apply"
        Note this will update the EB Stack, and Bring the Failed Stack up to a Healthy State.
           
     How to Deploy
     1.  Make changes to the local git Repo:  Make sure to Commit the changes
     2.  Execute from within your code repo:  
         a  "eb  deploy"    Note:  this will automatically Deploy The Lastest Rev in the Local Git Repo
         
     Note:  I added the CloudFormation Template for my Stack in my GitHub Repo.  It can be used to reproduce the Stack in my account.

     The link to my App is as follows:    mcooper-ip-list-app-dev.us-east-1.elasticbeanstalk.com 
     
     Note:  The application Has an issue that I have not been able to fix as of yet.  I will continue to work on it as I find time. 
            (This has kind of got me hooked)  The issue is that the IP in the log never seems to change.  I am assuming that it is the
            IP of the Loadbalancer.  It does count the ip, and the app shows when it Started, and how long it has been running. 
            (It only updates when a request is made to it.)  Todo:  Add a Meta Tag Refresh or something to have it up date on an
            interval. 
 
