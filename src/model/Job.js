//const { Database } = require("sqlite");
//const { update } = require("./Profile");
const Database = require('../db/config') 
const JobUteis = require('../uteis/jobUteis')


module.exports = {   

    async get(){
        const db = await Database();
        //const jobs = await db.all(`SELECT * FROM jobs`);        
        //const dateTime = await db.get(`SELECT strftime('%Y/%m/%d %H:%M:%S',created_at) from jobs where id=`+jobs.id);  
        const jobs = await db.all(`SELECT *, strftime("%d/%m/%Y %H:%M:%S",created_at) as dateTime FROM jobs`);

        await db.close();
        //Primeito return retorna para a função
        //console.log(jobs)
        //this.timeCount();
    
        return jobs.map(job => ({                     
            //segundo return retorna o objeto para o map            
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            created_at: job.created_at,
            dateTime: job.dateTime,
            countDown: JobUteis.timeCount()
            
        }))
        
    },
    async update(updatedJob, jobID){
        const db = await Database()

        db.run (`UPDATE jobs SET
            name = "${updatedJob.name}",
            daily_hours = ${updatedJob["daily-hours"]},
            total_hours = ${updatedJob["total-hours"]}
            WHERE id = ${jobID}
        `)
        await db.close() 
    },

    async delete(id){        
        const db = await Database()
        
        db.run(`DELETE FROM jobs WHERE id = ${id}`)

        await db.close()        
    },

    async create(newData){
        const db = await Database();

        await db.run(`INSERT INTO jobs(
            name,
            daily_hours,
            total_hours,
            created_at   
        )VALUES(
            "${newData.name}",
            ${newData["daily-hours"]},
            ${newData["total-hours"]},            
            datetime('now','localtime') 
        )`)

        await db.close()
    }


}