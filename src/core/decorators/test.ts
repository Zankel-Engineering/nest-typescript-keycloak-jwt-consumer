import { createParamDecorator } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions'
export const Jwt = (key, options: {
  isNullable?: boolean
} = {}): ParameterDecorator => {
  let validators = [];
  if (!options.isNullable) {
    validators.push(v => {
      if (!v) {
        throw new HttpException({
          statusCode: 401,
          error: "Unauthorized",
          message: "Cannot find a valid JWT token"
        }, 401);
      }
    })
  }
  return createParamDecorator((data, req) => {
    let { key, validators } = data;
    let jwt = req['jwt'];

    validators.forEach(validator => { validator(jwt) })
    return jwt && key ? jwt[key] : jwt;
  })({ key, validators });
}
