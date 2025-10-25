import { IsIn, IsNotEmpty, Length, length } from 'class-validator';
import { HttpEndpoint } from '../entities/endpoint.entity';

const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export class CreateEndpointDto {
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  @IsIn(httpMethods)
  method: HttpEndpoint;
}
