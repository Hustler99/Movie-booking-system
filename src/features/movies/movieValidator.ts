import Joi from "joi";
import { title } from "process";

function validateMovie(obj: object, isCreate = true) {
  const schema = Joi.object({
    title: Joi.string()
      .trim()
      .min(2)
      .max(100)
      .when("$isCreate", { is: true, then: Joi.required() }),
    description: Joi.string()
      .trim()
      .min(10)
      .max(100)
      .when("$isCreate", { is: true, then: Joi.required() }),
    duration: Joi.number().when("$isCreate", {
      is: true,
      then: Joi.required(),
    }),
    releaseDate: Joi.date().when("$isCreate", {
      is: true,
      then: Joi.required(),
    }),
  });
  return schema.validate(obj, {context:{isCreate}});
}
export default validateMovie
