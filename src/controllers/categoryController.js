import db from '../postgressStrategy/db.js'

export  async function  getCategories(req,res){

    try {
        const result = await db.query(' SELECT * FROM categories ')
        res.send(result.rows)

        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

}

export async function createCategory(req,res) {

    const category =req.body


    try {
    const result = await db.query('SELECT id FROM categories WHERE name=$1', [category.name])
    if (result.rowCount > 0) {
      return res.status(409).send("Ja existe")
    }

    await db.query(`INSERT INTO categories(name) VALUES ($1)`, [category.name])
    res.status(201).send("deu bao")
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}