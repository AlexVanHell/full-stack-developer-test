import {
	ArgumentMetadata,
	Type,
	ValidationPipe,
	ValidationPipeOptions,
} from '@nestjs/common';

export class DynamicTypeValidationPipe extends ValidationPipe {
	constructor(private type: Type<any>, options?: ValidationPipeOptions) {
		super(options);
	}

	public async transform(value: any, metadata: ArgumentMetadata) {
		return super.transform(value, {
			type: metadata.type,
			data: metadata.data,
			metatype: this.type,
		});
	}
}
