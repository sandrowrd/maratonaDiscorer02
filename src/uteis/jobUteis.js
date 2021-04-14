

module.exports = {
    //Função para retornar contagem regressiva quando resta apenas 1 dia
    //a contagem regressiva será em horas:minutos:segundos
    timeCount(){
        const timeNow = new Date();
        let sec = 0;
        let secStr, minStr, hourStr;
        if(timeNow.getSeconds != 0){
            sec = 60 - Number(timeNow.getSeconds());
            secStr = sec.toString();
        }    
        if( sec < 10){
            secStr = "0"+sec.toString();            
        }  
        let min = 59 - Number(timeNow.getMinutes());
        minStr = min.toString();
        if( min < 10){            
            minStr = "0"+min.toString();
        }
        let hour = 23 - Number(timeNow.getHours());
        hourStr = hour.toString();      
        
        //console.log(hourStr+":"+minStr+":"+secStr);
        return (hourStr+":"+minStr+":"+secStr);
    },
        //função que retorna os dias que restam para encerrar o projeto
        daysToHandOver(job){
            const remainingDays = (job["total-hours"]/job["daily-hours"]).toFixed()
            const createDate = new Date(job.created_at)
            const dueDay = createDate.getDate() + Number(remainingDays)
            const dueDateInMs = createDate.setDate(dueDay)
            const timeDiffInMs = dueDateInMs - Date.now()
            const dayInMs = 1000*60*60*24
            const dayDiff = Math.ceil(timeDiffInMs/dayInMs)
            //console.log(job.created_at)
            return dayDiff
        },
        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    }
    