import { Injectable } from '@nestjs/common';
import supabase from 'src/supabase';

@Injectable()
export class FiltersService {

    // TODO: handle errors

    private sEventsTable = supabase.from('events');

    async getAllYears() {
        const { data, error } = await this.sEventsTable.select('YEAR');
        if (error) {
            return error;
        }
        return [...new Set(data.map(yearObj => yearObj.YEAR))];
    }

    async getEventsByYear(year: number) {
        const { data, error } = await this.sEventsTable.select('ID, EVENT_NAME').eq('YEAR', year);
        if (error) {
            return error;
        }
        return [...new Set(data.map(eventObj => {
            return {
                eventId: eventObj.ID,
                eventName: eventObj.EVENT_NAME
            }
        }))];
    }

    async getSessionsByEvent(year: number, eventId: string) {
        const { data, error } = await this.sEventsTable.select('SESSIONS').eq('YEAR', year).eq('ID', eventId);
        if (error) {
            return error;
        }
        return [...new Set(data.map(sessionsObj => sessionsObj.SESSIONS))];
    }

    async getCategoriesByEvent(year: number, eventId: string) {
        const { data, error } = await this.sEventsTable.select('CATEGORIES').eq('YEAR', year).eq('ID', eventId);
        if (error) {
            return error;
        }
        return [...new Set(data.map(categoriesObj => categoriesObj.CATEGORIES))];
    }

    async getParticipantsByCategory(year: number, eventId: string, category: string) {
        const { data, error } = await this.sEventsTable.select('PARTICIPANTS').eq('YEAR', year).eq('ID', eventId)
        if (error) {
            return error;
        }
        return [...new Set(data.map(dataToFilter => dataToFilter.PARTICIPANTS[category]))];
    }

}
