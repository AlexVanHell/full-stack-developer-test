import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import Fs from 'fs';
import Path from 'path';
import { ConfigDirInterface } from '../interface/config-dir.interface';
import { ConfigInterface } from '../interface/config.interface';

@Injectable()
export class ConfigService {
	private static instance: ConfigService;
	private env: ConfigInterface;

	constructor() {
		this.setEnv();
	}

	public static getInstance() {
		if (this.instance) {
			return this.instance;
		}

		const instance = new ConfigService();
		return instance;
	}

	// For compiler only
	public get(): ConfigInterface;
	public get<T extends keyof ConfigInterface = any>(key: T): ConfigInterface[T];

	/**
	 * Get a key of configuration. Get all config object if no key is provided
	 * @template T Config key
	 * @param key The key to get
	 */
	public get(key?: keyof ConfigInterface) {
		if (!key) {
			return this.env;
		}

		return this.env[key];
	}

	private setEnv() {
		const dir = this.getDirConfig();
		const dotenvFilePath = Path.join(dir.root, '.env');

		if (Fs.existsSync(dotenvFilePath)) {
			config({ path: `${dir.root}/.env`, encoding: 'UTF-8' });
		} else {
			if (process.env.NODE_ENV !== 'production') {
				setTimeout(() => {
					process.exit(0);
				}, 100);
				throw new Error('WARNING: .env file does not exists');
			}
		}

		const processEnv = process.env;

		this.env = {
			debugMode: processEnv['env_debug_mode'] === 'true',
			dir,
			db: {
				host: processEnv['env_db_host'],
				port: Number(processEnv['env_db_port']),
				database: processEnv['env_db_database'],
				username: processEnv['env_db_username'],
				password: processEnv['env_db_password'],
				logging: processEnv['env_db_logging'] === 'true',
			},
			endpoints: {
				'auth-app': {
					url: processEnv['env_endpoints_auth_app_url'],
				},
				'events-app': {
					url: processEnv['env_endpoints_events_app_url'],
				},
			},
			adminUser: {
				username: processEnv['env_admin_username'],
				email: processEnv['env_admin_email'],
				firstname: 'Admin',
				lastname: 'Admin',
				password: processEnv['env_admin_password'],
			},
		};
	}

	private getDirConfig(): ConfigDirInterface {
		const root = Path.resolve(__dirname, '..', '..', '..');
		const src = Path.join(root, 'src');
		const dist = Path.join(root, 'dist');
		const working = Path.resolve(__dirname, '..', '..');

		return { root, src, dist, working };
	}
}
