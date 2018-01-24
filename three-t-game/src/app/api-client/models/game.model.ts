import { Move } from "./move.model";
import { User } from "./user.model";

export interface Game {
    id?: number;
    playerOneId: number;
    playerTwoId: number;
    moves?: Move[];
    playerOne?: User;
    playerTwo?: User;
}