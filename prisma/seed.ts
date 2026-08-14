import { PrismaClient, TodoStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	await prisma.todo.createMany({
		data: [
			{
				title: 'Prune roses',
				status: TodoStatus.TODO,
				latitude: -36.8485,
				longitude: 174.7633,
				address: 'Auckland, New Zealand'
			},
			{
				title: 'Water garden',
				status: TodoStatus.SCHEDULED,
				latitude: -41.2866,
				longitude: 174.7756,
				address: 'Wellington, New Zealand'
			},
			{
				title: 'Clean gutters',
				status: TodoStatus.DONE,
				latitude: -43.5321,
				longitude: 172.6362,
				address: 'Christchurch, New Zealand'
			},
			{
				title: 'Plant vegetable seedlings',
				status: TodoStatus.TODO,
				latitude: -37.787,
				longitude: 175.2793,
				address: 'Hamilton, New Zealand'
			},
			{
				title: 'Repair fence gate',
				status: TodoStatus.SCHEDULED,
				latitude: -38.1368,
				longitude: 176.2497,
				address: 'Rotorua, New Zealand'
			},
			{
				title: 'Trim hedges',
				status: TodoStatus.TODO,
				latitude: -45.0312,
				longitude: 168.6626,
				address: 'Queenstown, New Zealand'
			},
			{
				title: 'Install outdoor lights',
				status: TodoStatus.DONE,
				latitude: -39.4928,
				longitude: 176.912,
				address: 'Napier, New Zealand'
			},
			{
				title: 'Paint garden shed',
				status: TodoStatus.SCHEDULED,
				latitude: -46.4132,
				longitude: 168.3538,
				address: 'Invercargill, New Zealand'
			},
			{
				title: 'Remove fallen branches',
				status: TodoStatus.TODO,
				latitude: -40.3523,
				longitude: 175.6082,
				address: 'Palmerston North, New Zealand'
			},
			{
				title: 'Setup compost area',
				status: TodoStatus.DONE,
				latitude: -39.638,
				longitude: 176.8492,
				address: 'Hastings, New Zealand'
			}
		]
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.error(error);
		await prisma.$disconnect();
		throw error;
	});
