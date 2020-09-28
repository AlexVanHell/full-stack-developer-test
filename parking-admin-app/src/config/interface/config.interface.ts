import { UserInterface } from '../../module/user/user.schema';
import { ConfigDbInterface } from './config-db.interface';
import { ConfigDirInterface } from './config-dir.interface';
import { ConfigEndpointInterface } from './config-endpoint.interface';

export interface ConfigInterface {
	debugMode: boolean;
	dir: ConfigDirInterface;
	db: ConfigDbInterface;
	endpoints: Record<string, ConfigEndpointInterface>;
	adminUser: Partial<UserInterface>;
}
