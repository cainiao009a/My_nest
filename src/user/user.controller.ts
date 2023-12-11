import { Controller, Get, Post, Body, Patch, Param, Delete, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { ConfigService } from '@nestjs/config'

@Controller('user')
// 配置了整个的controller 的版本控制
// @Controller({
//   path: 'user',
//   version: '1',
// })
// 测试
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
    ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('findError')
  @Version([VERSION_NEUTRAL, '1'])
  findError() {
    const a: any = {}
    console.log(a.b.c)
    return this.userService.findAll();
  }

  @Get('getTestName')
  getTestName() {
    return this.configService.get('TEST_VALUE').name;
  }

  @Get('findBusinessError')
  @Version([VERSION_NEUTRAL, '1'])
  findBusinessError() {
    const a: any = {}
    try {
      console.log(a.b.c)
    } catch (error) {
      throw new BusinessException('this is error' )
    }
    return this.userService.findAll();
  }

  @Get()
  @Version([VERSION_NEUTRAL,'1'])
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  @Version('2')
  findAll1() {
    return 'this is two'
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
