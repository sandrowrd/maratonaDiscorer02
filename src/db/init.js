
//config é um arquivo js tem que colocar ./ indicando
//que está no diretório local
const Database = require('./config')

const initDb = {
    //async informa ao javaScript que dentro da estrutura tem await
    //que ele deve esperar terminar o comando antes de ir para o próximo
    async init(){

        //inicializaçào do BD
        //await faz o js esperar o Database() terminar de execultar um comando
        //antes de passar para o próximo
        const db = await Database()

        //criação do BD utiliza o crase no lugar das aspas
        await db.exec(`CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT
            )`);

        await db.exec(`CREATE TABLE jobs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at
            )`)

        await db.run(`INSERT INTO profile (
            name, 
            avatar, 
            monthly_budget, 
            days_per_week, 
            hours_per_day,
            vacation_per_year ,
            value_hour           
            )VALUES(
                "Sandro",
                "/images/paisagem.jpg",
                3000,
                5,
                5,
                4,
                70
            );`)

        await db.run(`INSERT INTO jobs(    
            name,
            daily_hours,
            total_hours,
            created_at
            )VALUES(
                "Pizzaria Guloso",
                2,
                1,
                datetime('now','localtime')
            );`)
        
        //a data do inicio do projeto será determinado pelo tempo atual
        //informado pelo próprio banco de dados.
        await db.run(`INSERT INTO jobs(    
            name,
            daily_hours,
            total_hours,
            created_at
            )VALUES(
                "OneTwo Project",
                3,
                47,
                datetime('now','localtime')
            );`)
        
        await db.close()
    }

}

initDb.init()


