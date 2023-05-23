
import moment from 'moment';
import { JwtService } from './jwtService';

export async function JwtVerify(req: any) {

  if (!req) {
    return 'Token não fornecido';
  }

  const [_, token] = req.split(' ');

  try {
    const decodedToken: any = await JwtService.verifyToken(token);
    const user = {
      userId: decodedToken.userId,
      login: decodedToken.login,
      expiration: moment.unix(decodedToken.exp).subtract(3, "hours").toISOString()
    }
    return(user);
  } catch (err) {
    return 'Token inválido';
  }
}
