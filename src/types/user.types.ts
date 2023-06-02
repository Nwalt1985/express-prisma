import { Post } from "@prisma/client";

export interface UserPost extends Post {
	authorEmail: string;
}