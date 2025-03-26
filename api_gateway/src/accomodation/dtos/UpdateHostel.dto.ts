import { CreateHostelDto } from "./CreateHostel.dto";
import { PartialType } from '@nestjs/mapped-types';


export class UpdateHostelDto extends PartialType(CreateHostelDto) {}
