// import * as readline from 'readline';


// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// const updateDueDate = async (spacedRepetitionId: string) => {
//   try {
//     const input = await new Promise<string>((resolve) => {
//       rl.question('Enter the date offset (e.g., -1, today, 7): ', (answer) => {
//         resolve(answer);
//         rl.close();
//       });
//     });

//     let dueDate: Date;

//     if (input === 'today') {
//       dueDate = new Date();
//     } else {
//       const offset = parseInt(input, 10);
//       dueDate = new Date(Date.now() + offset * 24 * 60 * 60 * 1000);
//     }

//     const updatedRecord = await db.update(schema.spacedRepetition)
//       .set({
//         dueDate,
//         updatedAt: new Date(),
//       })
//       .where(eq(schema.spacedRepetition.id,spacedRepetitionId))
//       .returning({ dueDate: schema.spacedRepetition.dueDate, updatedAt: schema.spacedRepetition.updatedAt })
//       .then((result) => result[0]);

//     console.log(`Due date updated successfully for ID: ${spacedRepetitionId}`);
//     console.log('Updated date:', updatedRecord.updatedAt);

//     return updatedRecord.dueDate;
//   } catch (error) {
//     console.error(`Error updating due date for ID: ${spacedRepetitionId}`, error);
//     throw error;
//   }
// };


// export { updateDueDate };
