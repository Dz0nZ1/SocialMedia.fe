import { HttpStatusCode } from "axios"

export interface DeleteResponseDto {
     success : boolean,
     statusCode : HttpStatusCode,
     message : string,
     TimeStamp : Date
}