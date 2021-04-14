
const Profile = require('../model/Profile')

//module permite que todo arquivos sejam exportavel
module.exports = {
    async index(req, res){
        return res.render("profile", { profile: await Profile.get()})
    },
    
    async update(req, res){
        const data = req.body
        const weekPerYears = 52
        const weekPerMonth = (weekPerYears - data["vacation-per-year"])/12
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        const monthlyTotalHours = weekTotalHours * weekPerMonth
        const valueHour = data["monthly-budget"]/monthlyTotalHours
        //console.log(weekTotalHours)

        await Profile.update({
            ...await Profile.get(),
            ...req.body,
            "value-hour": valueHour
        })
        return res.redirect('/profile')
    },
    
}