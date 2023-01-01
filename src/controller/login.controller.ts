import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";

export async function loginController(req: Request<{},{},CreateUserInput["body"]>, res: Response) {
    try{
        const user = await createUser(req.body);
        return res.send(user);
    }catch(err:any){
        logger.error(err);
        return res.status(409).send(err.message);
    }
}