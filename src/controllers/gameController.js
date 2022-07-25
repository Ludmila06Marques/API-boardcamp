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
    const game=req.body

    try {
        //existe essa categoria ?
        const result = await db.query(' SELECT id FROM categories  WHERE id=$1' ,[game.categoryId])
        if(result.rowCount===0){
            res.status(400).send("Nao existe essa categoria")
        }

        await db.query(`
        INSERT INTO games(name, image, "stockTotal", "categoryId", "pricePerDay")
        VALUES ($1, $2, $3, $4, $5);
      `, [game.name, game.image, Number(game.stockTotal), game.categoryId, Number(game.pricePerDay)]);
  
      res.sendStatus(201);
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
    
}