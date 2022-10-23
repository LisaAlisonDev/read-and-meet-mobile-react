export interface User{
    id : number;
    email : string;
    name : string;
}

export type UserContextType = {
    setUser: (user : any) => void;
    saveUser: (user : User) => void;
    getUser : () => any;
    getUserFromStorage: () => any;
    updateUser: (user : User) => void;
    logout: () => void;

}