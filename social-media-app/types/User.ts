import { PostDetailsDto } from "./Post";

export interface UserDetailsDto { 
    firstName: string,
    lastName : string,
    username : string,
    profilePictureUrl : string,
    bio : string,
    posts: PostDetailsDto[]

}