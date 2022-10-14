/* INPUT SET */
const inputSet = Array.from('qmind onboarding');
​
  /* WORK FUNCTION */
async function workFunction(letter) {
    progress();
    return letter.toUpperCase();
}
​
async function main() {
    
    const compute = require('dcp/compute');
    const job = compute.for(inputSet, workFunction);
    
    // Give a name for your job
    job.public.name = '{NAME_FOR_JOB}';
​
    // Use your team's designated compute group
    job.computeGroups = [{ joinKey: '{TEAM_NAME}', joinSecret: 'dcp' }];
​
    // Not mandatory, but you could log status updates by uncommenting the following code:
    //job.on('accepted', () => {
        //console.log(` - Job accepted with id: ${job.id}`);
    //});
    //job.on('result', (ev) => {
        //console.log(` - Received result ${ev}`);
    //});
​
    let resultSet = await job.exec();
    resultSet = Array.from(resultSet);
​
    // Process results to look pretty 
    console.log(resultSet.join(''));

}

require('dcp-client').init('https://scheduler.distributed.computer').then(main);
