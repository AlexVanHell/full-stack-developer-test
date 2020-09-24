import { ConfigDbInterface } from './config-db.interface';
import { ConfigDirInterface } from './config-dir.interface';

export interface ConfigInterface {
	debugMode: boolean;
	dir: ConfigDirInterface;
	db: ConfigDbInterface;
}
