import Joi from "joi";

export const PG_USER = process.env.PG_USER!;
export const PG_PASSWORD = process.env.PG_PASSWORD!;
export const PG_DB = process.env.PG_DB!;
export const PG_PORT = parseInt(process.env.PG_PORT!);

const env_schema = Joi.object({
    PG_DB: Joi.string().required(),
    PG_PASSWORD: Joi.string().required(),
    PG_USER: Joi.string().required(),
    PG_PORT: Joi.string().regex(/^[0-9]+$/).required()
}).required()

const { error } = env_schema.validate(env_schema);

if( error ) throw new Error(error.message);