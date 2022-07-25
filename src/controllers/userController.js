import db from '../postgressStrategy/db.js'


export async function getUsers(req,res){
    const {cpf}=req.body

    const params=[]
    let complete=" "

    if(cpf){
        params.push(`${cpf}%`)
        complete+=` WHERE cpf  LIKE $1`

    }

    try {
        const result =await db.query(`SELECT * FROM custumers ${complete}`, params)

      res.send(result.rows)


    } catch (error) {
        console.log(error)
        res.sendStatus(500)
        
    }
}
