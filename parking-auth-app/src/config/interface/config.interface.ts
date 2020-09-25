import { ConfigDirInterface } from './config-dir.interface';
import { ConfigEndpointInterface } from './config-endpoint.interface';
import { ConfigJwtOptionsInterface } from './config-jwt-options.interface';
import { ConfigPasswordInterface } from './config-password.interface';

export interface ConfigInterface {
	debugMode: boolean;
	dir: ConfigDirInterface;
	password: ConfigPasswordInterface;
	auth: ConfigJwtOptionsInterface;
	endpoints: Record<string, ConfigEndpointInterface>;
}
