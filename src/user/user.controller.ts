import { User } from './user';
import { UserService } from './user.service';

export class UserController {
    constructor(private userService: UserService) {}

    add(username: string , password: string , email:string): User {
        // is the username empty ?
        // is the username whitespaced ?
        // other checks...
        return this.userService.add(username, password, email);
    }



    getById(id: number): User | null {
        // is the id a decimal ?
        // is the id a negative number ?
        // other checks...
        return this.userService.getById(id);
    }
    update(id: number,username: string, password: string, email: string): User{
        return this.userService.update(id,username, password, email);
    }
    delete(id: number): User{
        return this.userService.delete(id);
    }
}
