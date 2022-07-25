import gameSchema from "../schemas/gameSchema.js";

export function validateGame(req, res, next) {
  const game = req.body;
  const validation = gameSchema.validate(game);
  if (validation.error) {
    console.log(validation.error)
    return res.status(400).send("deu n"); 
  }

  next();
}