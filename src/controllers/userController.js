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
        const result =await db.query(`SELECT * FROM customers ${complete}`, params)

      res.send(result.rows)


    } catch (error) {
        console.log(error)
        res.sendStatus(500)
        
    }
}

export async function getUser(req,res){
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      return res.sendStatus(400)
    }
  
    try {
      const result = await db.query(`SELECT * FROM customers WHERE id = $1`, [id]);
      if (result.rowCount === 0) {
        return res.sendStatus(404)
      }
  
      res.send(result.rows[0]);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
}

export async function createUser(req,res){
    const user= req.body

    try {
        const result= await db.query(`SELECT name FROM customers  WHERE cpf=$1` , [user.cpf])

        if(result.rowCount>0){
            return res.sendStatus(409)
        }
        
            await db.query(`
            INSERT INTO customers (name, phone, cpf, birthday) 
            VALUES ($1, $2, $3, $4);
        `, [user.name, user.phone, user.cpf, user.birthday]);

        res.sendStatus(201)

        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}
export async function updateUser(req, res){
    const {id}=req.params
    const user= req.body

    if (isNaN(parseInt(id))) {
        return res.sendStatus(400)
      }
    
      try {

        const result = await db.query(`
        SELECT id FROM customers WHERE cpf = $1 AND id != $2
      `, [customer.cpf, id]);
      if (result.rowCount > 0) {
        return res.sendStatus(409); // conflict
      }
        
      await db.query(`
      UPDATE customers 
      SET 
        name = $1, 
        phone = $2, 
        cpf = $3, 
        birthday = $4 
      WHERE id = $5
    `, [customer.name, customer.phone, customer.cpf, customer.birthday, id]);

    res.sendStatus(200)
      } catch (error) {
        console.log(error)
        res.sendStatus(500)
      }

    
}
