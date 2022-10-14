/* INPUT SET */
const inputSet = Array.from('qmind onboarding');

  /* WORK FUNCTION */
async function workFunction(letter) {
    progress();
    return letter.toUpperCase();
}

async function main() {
    
    const compute = require('dcp/compute');
    const job = compute.for(inputSet, workFunction);
    
    // job.public.name = 'Name for your job';

    // SKIP IF: you do not need a Compute Group -  Use Overwatch compute group
    job.computeGroups = [{ joinKey: 'ovwatch', joinSecret: '0UFRCfojif' }];

    // Not mandatory console logs for status updates
    job.on('accepted', () => {
        console.log(` - Job accepted with id: ${job.id}`);
    });
    job.on('result', (ev) => {
        console.log(` - Received result ${ev}`);
    });

    let resultSet = await job.exec();
    resultSet = Array.from(resultSet);

    // Process results to look pretty
    console.log(resultSet.toString().replace(',', ''));    

}
require('dcp-client').init('https://scheduler.distributed.computer').then(main);