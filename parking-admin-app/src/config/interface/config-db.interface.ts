import { ConfigDbCredentialsInterface } from './config-db-credentials.interface';

export interface ConfigDbInterface extends ConfigDbCredentialsInterface {
	readonly host: string;
	readonly port: number;
	readonly database: string;
	readonly logging: boolean | ((...args: any[]) => void);
}
