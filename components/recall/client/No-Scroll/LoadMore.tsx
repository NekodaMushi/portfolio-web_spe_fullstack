// "use client";

// import { useState } from "react";
// import CustomCard from "./CustomCard";
// import fetchCards from "../server/action";

// interface CarouselDataItem {
//   successRate: number;
//   attemptNumber: number;
//   totalQuestions: number;
//   incorrectAnswers: number;
//   highestScore: number;
//   highestScoreTotal: number;
//   updatedAt: string;
//   videoId: string;
// }

// type CarouselData = CarouselDataItem[];

// function LoadMore() {
//   const [data, setData] = useState<CarouselData>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(2);

//   const loadMoreData = async () => {
//     setIsLoading(true);

//     try {
//       const resData = await fetchCards(page);
//       setData((prevData) => [...prevData, ...resData]);
//       setPage((prevPage) => prevPage + 1);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       {data.map((item, index) => (
//         <CustomCard
//           key={index}
//           quizTitle={item.videoId}
//           length={item.totalQuestions}
//           lastScore={item.totalQuestions - item.incorrectAnswers}
//           highestScore={item.highestScore}
//           highestScoreTotal={item.highestScoreTotal}
//           lastAttempt={new Date(item.updatedAt).toLocaleDateString()}
//           attemptNumber={item.attemptNumber}
//         />
//       ))}
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <button onClick={loadMoreData}>Load More</button>
//       )}
//     </>
//   );
// }

// export default LoadMore;
