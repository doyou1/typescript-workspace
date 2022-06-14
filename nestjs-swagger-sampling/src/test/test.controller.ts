import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Test Module')
@Controller('test')
export class TestController {
  @Get('/getAll')
  @ApiOperation({ summary: 'Get all data from this api' })
  @ApiResponse({
    status: 200,
    description: 'All Data list',
  })
  @ApiResponse({
    status: 403,
    description: 'Fobidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  getAll(): string {
    return 'All Data list';
  }

  @Post('/create')
  @ApiOperation({ summary: 'create new record' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'interger',
          example: 5,
          description: 'this is unique id',
        },
        name: {
          type: 'string',
          example: 'testname',
          description: 'this is the name',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'saved...',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbbiden',
  })
  save(): string {
    return 'saved...';
  }

  @Put('/update')
  @ApiOperation({ summary: 'update the record' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'interger',
          example: 5,
          description: 'this is unique id',
        },
        name: {
          type: 'string',
          example: 'testname',
          description: 'this is the name',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'updated successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiddent',
  })
  update(): string {
    return 'updated...';
  }

  @Delete('/delete')
  @ApiOperation({ summary: 'delete the record' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'deleted the record',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  delete(): string {
    return 'deleted...';
  }
}
