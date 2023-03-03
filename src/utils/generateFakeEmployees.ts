import { rand, randEmail, randFirstName, randLastName, randNumber, randPastDate, randUuid } from '@ngneat/falso';

import { TEmployee } from '../store/employeeSlice'

export const generateFakeEmployees = (numRecords: number = 1000): TEmployee[] => {
    return Array(numRecords)
        .fill(0)
        .map((i) => {
            const genders: TEmployee['gender'][] = ['male', 'female'];
            const gender = rand(genders);
            const firstName = randFirstName({ gender }).slice(0, 10);
            const lastName = randLastName({ withAccents: false}).slice(0, 10);
            const email = randEmail();
            const joinedDate = randPastDate({ years: 10 }).toISOString();
            const phone = `${rand([6, 8, 9])}${randNumber({ min: 1000000, max: 9999999 }).toString()}`;

            return {gender, firstName, lastName, id: randUuid(), email, joinedDate, phone}
        })
}
