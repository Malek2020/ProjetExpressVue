import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user';

describe('UserController', () => {
    let sut: UserController;
    let userService: UserServiceSpy;

    beforeEach(() => {
        userService = new UserServiceSpy();
        sut = new UserController(userService);  
    });
    describe('add', () => {
        it('should throw an error given username is empty', () => {
        const usernames: string[]= [
            '',
            ' ', 
            '     '
        ] ;
        for (const username of usernames) {
            expect(() => sut.add(username, 'password', 'email')).toThrow();
        }
    });

    it('should call add on UserService when given username is valid ', () => {
        const validUsernames: string[] = ['username_1 ,'us','test'];
        for (const validUsername of validUsernames) {
            sut.add(validUsername);
        }
        expect(userService.callsToAdd).toBe(validUsernames.length);
         
       
    }); 


    });
    
class UserServiceSpy implements UserService {
    callsToAdd = 0;
    callsToGetById = 0;

    private dummyUser = new User(0, '');

    add(username: string): User {
        this.callsToAdd++;
        return this.dummyUser;
    }

    getById(id: number): User | null {
        this.callsToGetById++;
        return this.dummyUser;
    }
}