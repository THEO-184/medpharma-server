import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import {
  CreateConsultationDto,
  SearchConsultationsDto,
} from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { GetUser } from 'src/auth/decorators/officer.decorator';
import { JwtPayload } from 'src/auth/dto/auth.dto';

@UseGuards(AuthGuard)
@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Post()
  bookConsultation(
    @Body() payload: CreateConsultationDto,
    @GetUser() officer: JwtPayload,
  ) {
    return this.consultationService.bookConsultation(payload, officer);
  }

  @Get()
  getPatientConsultation(
    @Query() searchParams: SearchConsultationsDto,
    @GetUser('id') officerId: number,
  ) {
    return this.consultationService.getPatientConsultation(
      searchParams,
      officerId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConsultationDto: UpdateConsultationDto,
  ) {
    return this.consultationService.update(+id, updateConsultationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultationService.remove(+id);
  }
}
