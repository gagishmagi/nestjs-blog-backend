export interface AuthPayload {
    username: string
}

export interface UserResponse{
    email : string
    userame? : string
    bio: string
    image: string | null
}


export interface AuthResponse extends UserResponse{
    token: string
} 

export interface ProfileResponse extends UserResponse{
    following: boolean | null
}