import { User } from './user';

export interface UserService {
    add(username: string, password: string, email: string): User;
    getById(id: number): User | null;
    update(id: number, username: string, password: string, email: string): User;
    delete(id: number): User;
}
