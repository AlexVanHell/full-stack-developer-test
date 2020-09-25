import { Request } from 'express';
import { AuthUserDto } from '../dto/auth-user.dto';

export interface AuthRequest extends Request {
	user?: AuthUserDto;
}
