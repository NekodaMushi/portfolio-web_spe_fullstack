// "use client";

// import Image from "next/image";
// import { useInView } from "react-intersection-observer";
// import { useEffect, useState } from "react";

// import { fetchRecall } from "./action";
// import AnimeCard, { AnimeProp } from "./AnimeCard";
// import Spinner from "../ui/spinner";

// let page = 2;

// function LoadMore() {
//   const { ref, inView } = useInView();

//   const [data, setData] = useState<AnimeProp[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (inView) {
//       setIsLoading(true);
//       // Add a delay of 500 milliseconds
//       const delay = 500;

//       const timeoutId = setTimeout(() => {
//         fetchRecall(page).then((res) => {
//           setData([...data, ...res]);
//           page++;
//         });

//         setIsLoading(false);
//       }, delay);

//       // Clear the timeout if the component is unmounted or inView becomes false
//       return () => clearTimeout(timeoutId);
//     }
//   }, [inView, data, isLoading]);

//   return (
//     <>
//       <section className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {data.map((item: AnimeProp, index: number) => (
//           <AnimeCard key={item.id} anime={item} index={index} />
//         ))}
//       </section>
//       <section className="flex w-full items-center justify-center">
//         <div ref={ref}>{inView && isLoading && <Spinner />}</div>
//       </section>
//     </>
//   );
// }

// export default LoadMore;
