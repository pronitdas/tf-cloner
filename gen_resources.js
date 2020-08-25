let allResources = [
  'alb',
  'asg',
  'cwa',
  'dbpg',
  'dbsg',
  'dbsn',
  'ddb',
  'ec2',
  'ecc',
  'ecsn',
  'efs',
  'eip',
  'elb',
  'iamg',
  'iamgm',
  'iamgp',
  'iamip',
  'iamp',
  'iampa',
  'iamr',
  'iamrp',
  'iamu',
  'iamup',
  'igw',
  'kmsa',
  'kmsk',
  'lc',
  'nacl',
  'nat',
  'nif',
  'r53r',
  'r53z',
  'rds',
  'rs',
  'rt',
  'rta',
  's3',
  'sg',
  'sn',
  'snss',
  'snst',
  'sqs',
  'vgw',
  'vpc'
]

const { exec } = require('child_process')
const fs = require('fs')

const commander = (resource, region, profile) => {
  const command = `terraforming ${resource} --profile ${profile} --region ${region}`
  const terraformer = exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    if (!stderr && stdout.trim().length > 0) {
      if (!fs.existsSync(`${profile}/${region}`)) {
        fs.mkdirSync(`${profile}/${region}`)
      }
      fs.writeFileSync(`${profile}/${region}/${resource}.tf`, stdout)
    }
    console.log(`stdout: ${stdout}`)
    console.error(`stderr: ${stderr}`)
  })
}



// provide region and profile for aws credentials
allResources.forEach(resource => commander(resource, 'ap-south-1', '#profile'))
