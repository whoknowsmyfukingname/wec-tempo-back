import { Min, MinLength } from "class-validator";


export class GetEventsByYear {
    @Min(2011)
    year: number;
}

export class GetSessionsOrCategoriesByEventDto {
    @Min(2011)
    year: number;
    
    @MinLength(1)
    eventId: string;
}

export class GetParticipantsByCategoryDto {
    @Min(2011)
    year: number;
    
    @MinLength(1)
    eventId: string;

    @MinLength(1)
    category: string;
}