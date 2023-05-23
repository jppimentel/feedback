import { jwtConfig } from './jwtConfig';
import * as jwt from 'jsonwebtoken';

export class JwtService {
  static async generateToken(payload: any) {
    return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  }

  static async verifyToken(token: string) {
    try {
      return jwt.verify(token, jwtConfig.secret);
    } catch (err) {
      throw new Error('Token inválido');
    }
  }
}