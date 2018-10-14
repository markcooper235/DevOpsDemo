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
