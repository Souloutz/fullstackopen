import zod from 'zod';
import { Visibility, Weather } from '../types';

const newEntrySchema = zod.object({
    weather: zod.nativeEnum(Weather),
    visibility: zod.nativeEnum(Visibility),
    date: zod.string().date(),
    comment: zod.string().optional()
});

export default newEntrySchema;