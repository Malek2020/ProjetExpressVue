import { Router } from 'express';
import { UserController } from './user.controller';
import { User } from './user';

export class UserRouter {
    router = Router();

    constructor(private userController: UserController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/:id', (req, res, next) => {
            try {
                const result = this.userController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.post('/add-user', (req, res, next) => {
            try {
                const result = this.userController.add(req.body.username, req.body.password, req.body.email);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.put('/update-user/:id', (req, res, next) => {
            try {
                const id = parseInt(req.params.id);
                const update = req.body;
                const result = this.userController.update(id, update.username, update.password, update.email);

                res.status(200).json({ result });
            } catch (err) {
                res.status(400).json({ message: err });
            }
        });
        this.router.delete('/delete-user/:id', (req, res, next) => {
            try {
                const id = parseInt(req.params.id);
                const result = this.userController.delete(id);
                res.status(200).json({ result });
            }
            catch (err) {
                res.status(400).json({ message: err });
            }
            
        });

}}
