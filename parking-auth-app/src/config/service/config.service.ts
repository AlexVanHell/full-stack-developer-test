import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import Fs from 'fs';
import { Algorithm } from 'jsonwebtoken';
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
			password: {
				saltRounds: Number(processEnv['env_password_salt_rounds']),
			},
			auth: {
				secret: processEnv['env_auth_secret'],
				expiresIn: processEnv['env_auth_expires_in'],
				issuer: processEnv['env_auth_issuer'],
				audience: processEnv['env_auth_audience'],
				algorithm: processEnv['env_auth_algorith'] as Algorithm,
				certFilePath: processEnv['env_auth_cert_file_path'],
			},
			endpoints: {
				'admin-app': {
					url: processEnv['env_endpoints_admin_app_url'],
				},
				'events-app': {
					url: processEnv['env_endpoints_events_app_url'],
				},
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
