import fs from 'fs';
import { UserJSONService } from './user.json-service';
import { User } from './user';

// Pour lancer les tests : "npm run test" (sans les guillemets) dans l'invite de commandes

// Mock du module fs
jest.mock('fs');
const fsMock = fs as jest.Mocked<typeof fs>;

describe('UserJSONService', () => {
    // System Under Test
    let sut: UserJSONService;

    beforeEach(() => {
        sut = new UserJSONService();
        jest.resetAllMocks();
    });
    
    describe('add', () => {
        it('should throw an error when given username points to an existing user', () => {
            const existingUsername = 'username';
            const users: User[] = [new User(0, existingUsername, 'password', 'email')];
            stubReadFileSync(users);

            expect(() => sut.add(existingUsername,'password', 'email' )).toThrow();
        });

        it('should override users with an array containing given new user', () => {
            const users: User[] = [
                new User(0, 'username_28', 'password', 'email'),
                new User(1, 'username_910', 'password', 'email'),
            ];
            stubReadFileSync(users);

            const userToCreate = new User(2, 'username_03', 'password', 'email');

            sut.add(userToCreate.username, userToCreate.password, userToCreate.email);

            const stringifiedUsers = JSON.stringify(users.concat(userToCreate));
            expect(fsMock.writeFileSync).toHaveBeenCalledTimes(1);
            expect(fsMock.writeFileSync).toHaveBeenCalledWith(
                './src/user/users.json',
                stringifiedUsers,
            );
        });
    });


    describe('getById', () => {
        it('should read json file using fs module', () => {
            const users: User[] = [];
            stubReadFileSync(users);
            const stringifiedUsers = JSON.stringify(users);
            const dummyBuffer = Buffer.from(stringifiedUsers);

            fsMock.readFileSync.mockReturnValueOnce(dummyBuffer);

            sut.getById(0);
            expect(fsMock.readFileSync).toHaveBeenCalledTimes(1);
            expect(fsMock.readFileSync).toHaveBeenCalledWith(
                './src/user/users.json',
            );
        });
        it('should return null when no user has been found', () => {
            const users: User[] = [];
            stubReadFileSync(users);

            const result = sut.getById(0);

            expect(result).toBeNull();
        });

        it('should return the right User when it has been found using given id', () => {
            const users: User[] = [new User(0, 'username','password','password')];
            stubReadFileSync(users);

            const result = sut.getById(users[0].id);

            expect(result).toEqual(users[0]);
        });
    });
});

function stubReadFileSync(users: User[]): void {
    const stringifiedUsers = JSON.stringify(users);
    const dummyBuffer = Buffer.from(stringifiedUsers);

    fsMock.readFileSync.mockReturnValueOnce(dummyBuffer);
}