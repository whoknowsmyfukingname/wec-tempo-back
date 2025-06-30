import { Injectable } from '@nestjs/common';
import supabase from 'src/supabase';

@Injectable()
export class TempoService {

    // TODO: handle errors

    async getSessionTempo(event: string, session: string, participant: number) {
        const { data, error } = await supabase.from(`${event}_${session}`).select('ELAPSED, LAP_TIME, LAP_NUMBER, S1, S2, S3, KPH, DRIVER_NAME, CROSSING_FINISH_LINE_IN_PIT, PIT_TIME').eq('NUMBER', participant);
        if (error) {
            return error;
        }
        return data.map(tempo => {
            return {
                elapsed: this.convertTimestampToMilliseconds(tempo.ELAPSED),
                lapTime: this.convertTimestampToMilliseconds(tempo.LAP_TIME),
                lapNumber: tempo.LAP_NUMBER,
                sector1: this.convertTimestampToMilliseconds(tempo.S1),
                sector2: this.convertTimestampToMilliseconds(tempo.S2),
                sector3: this.convertTimestampToMilliseconds(tempo.S3),
                averageSpeed: tempo.KPH,
                driverName: tempo.DRIVER_NAME,
                // TODO: review if correct
                isInPits: tempo.CROSSING_FINISH_LINE_IN_PIT && tempo.CROSSING_FINISH_LINE_IN_PIT.length,
                pitTime: tempo.PIT_TIME && tempo.PIT_TIME.length > 0 ? this.convertTimestampToMilliseconds(tempo.PIT_TIME) : null
            }
        });
    }

    private convertTimestampToMilliseconds(timestamp: string): number {
        if (timestamp.includes(':')) {
            // Split the timestamp into parts based on ':'
            let [minutes, rest] = timestamp.split(':');
            let [seconds, milliseconds] = rest.split('.');
    
            // Convert the parts into milliseconds
            let minutesInMilliseconds = parseInt(minutes) * 60 * 1000; // 1 minute = 60,000 ms
            let secondsInMilliseconds = parseInt(seconds) * 1000; // 1 second = 1000 ms
            let millisecondsInNumber = parseInt(milliseconds); // Already in milliseconds
    
            // Return the total time in milliseconds
            return minutesInMilliseconds + secondsInMilliseconds + millisecondsInNumber;
        }
        return +timestamp;
    }
}
