import db from '../postgressStrategy/db.js'

export async function getRents(req,res){
  //nao consegui 
}
export async function newRent(req,res){
    const rent = req.body;


  try {
    const userExist = await db.query(`
      SELECT id FROM customers WHERE id = $1
    `, [rent.customerId]);
    if (userExist.rowCount === 0) {
      return res.sendStatus(400); 
    }

    const gameExist = await db.query(`
      SELECT * FROM games WHERE id=$1
    `, [rent.gameId]);
    if (gameExist.rowCount === 0) {
      return res.sendStatus(400); 
    }
    const game = gameExist.rows[0];

    const gameIsRent = await db.query(`
      SELECT id
      FROM rentals 
      WHERE "gameId" = $1 AND "returnDate" IS null
    `, [rent.gameId])



    if (gameIsRent.rowCount > 0) {
      if (game.stockTotal === gameIsRent.rowCount) {
        return res.sendStatus(400)
      }
    }

    const originalPrice = rent.daysRented * game.pricePerDay;
    await db.query(`
      INSERT INTO 
        rentals (
          "customerId", "gameId", "rentDate", 
          "daysRented", "returnDate", "originalPrice", "delayFee"
        )
        VALUES ($1, $2, NOW(), $3, null, $4, null); 
      `, [rent.customerId, rent.gameId, rent.daysRented, originalPrice]);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export async function finishRent(req,res){
    //nao consegui
}
export async function cleanRent(req,res){
    const {id} = req.params;
    try {
      const result = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
      if(result.rowCount === 0) {
        res.sendStatus(404)
      } else {
        const rental = result.rows[0];
        if(!rental.returnDate) res.sendStatus(400)
        else {
          await db.query(`DELETE FROM rentals WHERE id = $1`, [id]);
        }
      }
    } catch(error) {
      console.log(error);
      res.sendStatus(500)
    }
}