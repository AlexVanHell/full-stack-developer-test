import { ArgumentsHost, OnModuleInit } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '../../config/service/config.service';
import { ApiException } from '../api-exception/api-exception';

export abstract class BaseExceptionFilter implements OnModuleInit {
	protected debugMode = false;

	/**
	 * Nest JS Life clycle event
	 */
	public onModuleInit() {
		const configService = ConfigService.getInstance();
		const debugMode = configService.get('debugMode');
		this.debugMode = debugMode;
	}

	protected throwApiException(
		exception: ApiException,
		host: ArgumentsHost,
		extra?: string,
	) {
		if (this.debugMode) {
			console.log(
				`[BaseExceptionFilter] ${extra ? `[${extra}] ` : ''}--->>>`,
				exception,
			);
		}

		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.statusCode;

		response.status(status).json({
			statusCode: status,
			code: exception.code,
			message: exception.message,
			timestamp: new Date().toISOString(),
			path: request.url,
			errors: exception.errors,
		});
	}
}
