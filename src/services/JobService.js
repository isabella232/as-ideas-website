import xmlParser from 'xml-js';

class JobService {
    getJobs() {
        return fetch('https://career.axelspringer.com/export/14/feed.xml')
            .then(response => {
                return response.text();
            })
            .then(xml => {
                let data = JSON.parse(xmlParser.xml2json(xml, { compact: true, spaces: 4 }));

                let jobList = data.jobs.job;
                return jobList;
            });

    }
    getJobById(jobId) {
        return fetch('https://career.axelspringer.com/export/14/feed.xml')
            .then(response => {
                return response.text();
            })
            .then(xml => {
                let data = JSON.parse(xmlParser.xml2json(xml, { compact: true, spaces: 4 }));

                let jobList = data.jobs.job;

                let jobById = jobList.filter(job => {
                    return job._attributes.jobId === jobId;
                })[0];

                return jobById;
            });
    }
}

export default new JobService();