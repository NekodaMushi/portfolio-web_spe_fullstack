// // import Search from "/search";
// // import { data } from "./_data";
// import LoadMore from "./LoadMore";
// import CustomCard from "./CustomCard";

// import { fetchRecallAll } from "./action";

// async function InfiniteCards() {
//   // const data = await fetchRecallAll(1);

//   return (
//     <main className="flex flex-col gap-10 px-8 py-16 sm:p-16">
//       <h2 className="text-3xl font-bold text-white">Explore </h2>

//       <section className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {data.map((item: CustomCard, index: number) => (
//           <CustomCard
//             key={item.id}
//             index={index}
//             title="307. Reusing Styles With React Components"
//             length={20}
//             lastScore={4}
//             highestScore={14}
//             lastAttempt="2"
//             attemptNumber={6}
//           />
//         ))}
//       </section>
//       <LoadMore />
//     </main>
//   );
// }

// export default InfiniteCards;
