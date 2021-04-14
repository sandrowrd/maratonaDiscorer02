
const Job = require('../model/Job')
const JobUteis = require('../uteis/jobUteis')
const Profile = require('../model/Profile')

module.exports = {
    async index(req, res){

        const profile = await Profile.get();
        const jobs = await Job.get();

        
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        let JobTotalHours = 0

        const updatedJobs = jobs.map( (job) => {                
            const remaining = JobUteis.daysToHandOver(job)
            const status = remaining <= 0 ? 'done' : 'progress'   

            statusCount[status] += 1;

            if(status == 'progress'){
                JobTotalHours += Number(job["daily-hours"])
                //console.log(job["daily-hours"])
                //console.log(profile["hours-per-day"])
            }
            
            //console.log(job.id)
            return {
                ...job,
                remaining,
                status,
                budget: JobUteis.calculateBudget(job, profile["value-hour"]) 
                
            }
            
        })   
        
        
        const freeHours = profile["hours-per-day"]-JobTotalHours;
        //console.log(JobTotalHours)
        return res.render("index", {jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours})
    }
}
