import { Post, PrismaClient, User } from '@prisma/client'
import { UserPost } from '../types/user.types';

const prisma = new PrismaClient();

export async function getUsers(): Promise<Array<User>> {
	try {
		return await prisma.user.findMany();
	} catch(e) {
		console.error(e);
		await prisma.$disconnect()
    	process.exit(1)
	}
}

export async function getUserByEmail(email: string): Promise<User> {
	try {
		const user =  await prisma.user.findUnique({
			where: {
				email: email
			}
		});

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	} catch(e) {
		console.error(e);
		await prisma.$disconnect()
    	process.exit(1)
	}
}

export async function getUserPostByEmail(email: string): Promise<User> {
	try {
		const user =  await prisma.user.findUnique({
			where: {
				email: email
			},
			include: {
				posts: true
			}
		});

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	} catch(e) {
		console.error(e);
		await prisma.$disconnect()
    	process.exit(1)
	}
}

export async function createUser(user: User): Promise<User> {
	try {
		const newUser = await prisma.user.create({
			data: {
				name: user.name,
				email: user.email
			}
		});

		return newUser;
	} catch(e) {
		console.error(e);
		await prisma.$disconnect()
		process.exit(1)
	}
}

export async function createUserPost(post: UserPost): Promise<Post> {
	try {
		const userPost = await prisma.post.create({
			data: {
				author: {
					connect: {
						email: post.authorEmail
					}
				},
				title: post.title,
				content: post.content
			}
		});

		return userPost;
	} catch(e) {
		console.error(e);
		await prisma.$disconnect()
		process.exit(1)
	}
}