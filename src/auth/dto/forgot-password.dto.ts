import { ApiProperty } from "@nestjs/swagger";
import { isNotEmpty } from "class-validator";

export class ForgotPasswordDto {
    @ApiProperty()
    // @isNotEmpty()
    email:string;
}