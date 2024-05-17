// joi middeleware

import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const CategoryBodyValidations = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        nombre_categoria: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    next();
}