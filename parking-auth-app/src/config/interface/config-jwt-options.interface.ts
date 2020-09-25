import { Algorithm, SignOptions } from 'jsonwebtoken';

export interface ConfigJwtOptionsInterface {
	secret: string;
	expiresIn: SignOptions['expiresIn'];
	issuer?: SignOptions['issuer'];
	audience?: SignOptions['audience'];
	algorithm?: Algorithm;
	certFilePath?: string;
}
