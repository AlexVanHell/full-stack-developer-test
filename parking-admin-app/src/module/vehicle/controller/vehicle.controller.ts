import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiException } from '../../../common/api-exception/api-exception';
import { ApiExceptionResponse } from '../../../common/api-exception/api-exception-response.decorator';
import { Auth } from '../../auth/decorator/auth.decorator';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { VehicleDto } from '../dto/vehicle.dto';
import { VehicleService } from '../service/vehicle.service';

@Controller('/vehicle')
@Auth()
@ApiTags('Vehicles')
export class VehicleController {
	constructor(private service: VehicleService) {}

	@Get()
	@ApiOperation({
		summary: 'Get vehicles',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Vehicles list',
		isArray: true,
		type: VehicleDto,
	})
	public async getAll() {
		return this.service.getAll();
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({
		summary: 'Create new vehicle',
	})
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'Created vehicle object',
		type: VehicleDto,
	})
	@ApiExceptionResponse(
		{ statusCode: HttpStatus.CONFLICT, code: 'VEHICLE_USERNAME_IN_USE' },
		{ statusCode: HttpStatus.CONFLICT, code: 'VEHICLE_EMAIL_IN_USE' },
	)
	public async create(@Body() body: CreateVehicleDto) {
		const vehicle = await this.service.create(body);
		return vehicle;
	}

	@Get('/:id([a-z0-9_-]+)')
	@ApiOperation({
		summary: 'Get vehicle by id',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Vehicle object',
		type: VehicleDto,
	})
	@ApiExceptionResponse({
		statusCode: HttpStatus.NOT_FOUND,
		code: 'VEHICLE_NOT_FOUND',
	})
	public async getByVehiclename(@Param('id') id: string) {
		const vehicle = this.service.getById(id);

		if (!vehicle) {
			throw new ApiException(HttpStatus.NOT_FOUND, 'VEHICLE_NOT_FOUND');
		}
	}

	@Put('/:id([a-z0-9_-]+)')
	@ApiOperation({
		summary: 'Update existing vehicle',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Updated vehicle object',
		type: VehicleDto,
	})
	@ApiExceptionResponse(
		{ statusCode: HttpStatus.NOT_FOUND, code: 'VEHICLE_NOT_FOUND' },
		{ statusCode: HttpStatus.CONFLICT, code: 'VEHICLE_USERNAME_IN_USE' },
		{ statusCode: HttpStatus.CONFLICT, code: 'VEHICLE_EMAIL_IN_USE' },
	)
	public async update(@Param('id') id: string, @Body() body: UpdateVehicleDto) {
		return this.service.updateById(id, body);
	}

	@Delete('/:id([a-z0-9_-]+)')
	@ApiOperation({
		summary: 'Delete existing vehicle',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Empty response',
	})
	@ApiExceptionResponse({
		statusCode: HttpStatus.NOT_FOUND,
		code: 'VEHICLE_NOT_FOUND',
	})
	public async delete(@Param('id') id: string) {
		return this.service.deleteById(id);
	}
}
