import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import supabase from 'src/supabase';

@Injectable()
export class SessionsService {
    // TODO: review errors
    sessionsTable = supabase.from('sessions');

    async getAllYears() {
        const { data, error } = await this.sessionsTable.select('YEAR');
        if (error) {
            return [];
        }
        return [... new Set(data.map(yearObj => yearObj.YEAR))];
    }

    async getPlacesByYear(year: number) {
        if (year < 2011) {
            throw new NotFoundException(`Error with year "${year}": There is no data prior to 2011`);
        }
        const { data, error } = await this.sessionsTable.select('PLACE').eq('YEAR', `${year}`);
        if (error) {
            return [];
        }
        if (!data || data.length < 1) {
            throw new InternalServerErrorException(`There is no data for year "${year}"`);
        }
        return [...new Set(data.map(placeObj => placeObj.PLACE))];
    }

    async getSessionsByYearAndPlace(year: number, place: string) {
        const { data, error } = await this.sessionsTable.select('SESSION').eq('YEAR', `${year}`).eq('PLACE', place);
        if (error) {
            return [];
        }
        if (!data || data.length < 1) {
            throw new InternalServerErrorException(`There is no data for year "${year}" or place "${place}"`);
        }
        return [...new Set(data.map(sessionObj => sessionObj.SESSION))];
    }

    async getCategoriesInSession(year: number, place: string, session: string) {
        const { data, error } = await this.sessionsTable.select('CATEGORY').eq('YEAR', `${year}`).eq('PLACE', place).eq('SESSION', session);
        if (error) {
            return [];
        }
        if (!data || data.length < 1) {
            throw new InternalServerErrorException(`There is no data for year "${year}", place "${place}" or session "${session}"`);
        }
        return [...new Set(data.map(categoryObj => categoryObj.CATEGORY))]
    }
}