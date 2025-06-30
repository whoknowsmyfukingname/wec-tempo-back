import { Min, MinLength } from "class-validator";

export class GetSessionTempoDto {

    @MinLength(1)
    event: string;

    @MinLength(1)
    session: string;

    @Min(1)
    participant: number;
}