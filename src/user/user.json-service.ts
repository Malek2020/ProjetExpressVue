import { existsSync, readFileSync, writeFileSync } from 'fs';
import { isArrayEmpty } from '../utils';
import { User } from './user';
import { UserService } from './user.service';

const DEFAULT_USER_ID = 0;

export class UserJSONService implements UserService {
    private readonly userJsonPath = './src/user/users.json';

    constructor() {
        this.writeDefaultUsersJsonFile();
    }

    add(username: string, password: string , email:string ): User {
        const users = this.getUsersFromJsonFile();
        const newId = this.generateUniqueId(users);
        const newUser = new User(newId, username, password, email);

        users.push(newUser);
        this.overrideUsers(users);

        return newUser;
    }

    getById(id: number): User | null {
        const users = this.getUsersFromJsonFile();

        const existingUser = users.find((user) => user.id == id);
        return existingUser || null;
    }

    update(id: number,username: string, password: string, email: string): User {
        const users = this.getUsersFromJsonFile();
        const existingUser = users.find((user) => user.id == id);
        if (!existingUser) {
            throw new Error(`User with id ${id} not found`);
        }
        existingUser.username = username;
        existingUser.password = password;
        existingUser.email = email;
        this.overrideUsers(users);
        return existingUser;
    }
    delete(id: number): User{
        const user = this.getUsersFromJsonFile();
        const existingUser = user.find((user) => user.id == id);
        if (!existingUser) {
            throw new Error(`User with id ${id} not found`);
        }
        const index = user.indexOf(existingUser);
        user.splice(index, 1);
        this.overrideUsers(user);
        const message = " user deleted successfully"
        return existingUser;
    }

    private writeDefaultUsersJsonFile(): void {
        if (!existsSync(this.userJsonPath)) {
            writeFileSync(this.userJsonPath, JSON.stringify([]));
        }
    }

    private getUsersFromJsonFile(): User[] {
        const buffer = readFileSync(this.userJsonPath);
        const users = JSON.parse(buffer.toString()) as User[];
        return users;
    }

    private generateUniqueId(users: User[]): number {
        if (isArrayEmpty(users)) {
            return DEFAULT_USER_ID;
        }

        const userIds = users.map((user) => user.id);
        return Math.max(...userIds) + 1;
    }

    private overrideUsers(users: User[]): void {
        writeFileSync(this.userJsonPath, JSON.stringify(users));
    }
}
