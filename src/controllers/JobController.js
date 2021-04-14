
const Job = require('../model/Job')
const JobUteis = require('../uteis/jobUteis')
const Profile = require('../model/Profile')


module.exports = {     

    async save(req, res){          
        
        await Job.create({                       
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            //created_at: Date.now()
        })
        return res.redirect('/')
    },
    
    create(req, res){
        return res.render("job")
    },

    async show(req, res){
        const jobID = req.params.id
        const profile = await Profile.get();
        const jobs = await Job.get()

        const job = jobs.find(job => Number(job.id) === Number(jobID))
        if(!job){
            return res.send("Job não encontrado.")
        }
        job.budget = JobUteis.calculateBudget(job, profile["value-hour"])
        //console.log(job["daily-hours"])
        return res.render("job-edit", { job })
    },

    async update(req, res){
        //req.params.id esta pegando da url
        const jobID = req.params.id
                
        const updatedJob = {            
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }
        
        await Job.update(updatedJob, jobID);

        res.redirect('/job/' + jobID)
    },

    async delete(req, res){
        const jobId = req.params.id
         
         await Job.delete(jobId);

        return res.redirect('/')
    }

    
    
}
