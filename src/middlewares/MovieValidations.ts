// joi middeleware

import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const MovieBodyValidations = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        nombre_pelicula: Joi.string().required(),
        fecha_estreno_pelicula: Joi.string().required(),
        duracion_pelicula: Joi.number().required(),
        id_categoria: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    next();
}