export interface Profile {
    id: string;
    userId: string;
    name: string;
    bio: string;
    headline: string;
    photoUrl?: string;
    interests: string[];
    createdAt: string;
    updatedAt: string;
}

export interface ProfileFormData {
    name: string;
    bio: string;
    headline: string;
    photoUrl?: string;
    interests: string[];
}
