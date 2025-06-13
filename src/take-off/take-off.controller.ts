import { Controller } from '@nestjs/common';
import { TakeOffService } from './take-off.service';

@Controller('take-off')
export class TakeOffController {
    constructor(private service:TakeOffService){}
}
