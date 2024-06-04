import { UserFullNameDto } from "./User"

export interface CommentDetailsDto {
    content : string,
    createdAt : Date,
    modifiedAt: Date,
    info : CommentInfo
}

export interface CommentInfo {
    user : UserFullNameDto
}