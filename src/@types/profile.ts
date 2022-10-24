export interface Profile{
    id : number;
    avatar : string;
    description : string;
    visibility: boolean;
    user_id : string;
}


export type ProfileContextType = {
    saveProfile: (profile : any) => void;
    setProfile: (profile : Profile) => void;
    getProfile : () => Profile;
    updateProfile: (profile : Profile) => void;
}