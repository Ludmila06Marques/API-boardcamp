import db from '../postgressStrategy/db.js'


export async function getGames(req,res){

    try {
        const {name}=req.query
        const params=[]
        let complete=" "

        if(name){
            params.push(`${name}%`)
            complete+=` WHERE game.name  ILIKE $1`

        }
        const result = await db.query(`
        SELECT games.*, categories.name AS "categoryName" 
        FROM games
        JOIN categories ON categories.id=games."categoryId"
        ${complete}
      `, params)
        res.send(result.rows)
        
    } catch (error) {'categoryId'
        console.log(error)
        res.sendStatus(500)
    }

}

export async function createGame(req,res){
    
}