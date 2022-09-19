import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { ParseIntPipe } from './common/pipes/parse-int.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test/:number')
  @UsePipes(ParseIntPipe)
  async toNumber(
    @Param('number', ParseIntPipe) numberFromString: number,
  ): Promise<number> {
    return numberFromString;
  }
}
