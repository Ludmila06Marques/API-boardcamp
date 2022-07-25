import rentSchema from "../schemas/rentSchema.js";

export function validateRental(req, res, next) {
  const rental = req.body
  const validation = rentSchema.validate(rental);
  if (validation.error) {
    return res.sendStatus(400)
  }

  next();
}