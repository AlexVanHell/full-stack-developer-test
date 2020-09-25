import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	app.enableCors();
	app.useGlobalPipes(new ValidationPipe());

	const options = new DocumentBuilder()
		.setTitle('Parking Admin App')
		.setDescription('Parking Admin App REST API')
		.setVersion('1.0')
		.addBearerAuth({
			type: 'http',
			description: 'Bearer authentication',
			name: 'JWT',
		})
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api-docs', app, document);

	await app.listen(process.env.PORT || 3000);
}
bootstrap();
