import { UserRoleTypes } from "../auth/api/dtos";

export class UserRoleViewModel {
    public userRoleType: UserRoleTypes;
    public isRecursive: boolean;
    public displayName: string;
}