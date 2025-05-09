import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function addCreditsToUser() {
  try {
    const userEmail = 'jackitunisi@gmail.com';

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: {email: userEmail},
    });

    if (!user) {
      console.log(`No user found with email: ${userEmail}`);
      return;
    }

    // Update the user's credit balance by adding 4 credits
    const updatedUser = await prisma.user.update({
      where: {email: userEmail},
      data: {
        creditBalance: {
          increment: 4, // Increment the balance by 4
        },
      },
    });

    console.log(
      `Successfully added 4 credits to user ${userEmail}. New balance: ${updatedUser.creditBalance}`
    );
  } catch (error) {
    console.error('Error updating user credits:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
addCreditsToUser();
