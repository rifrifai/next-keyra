import { useEffect, useState } from "react";
import localFont from "next/font/local";
import axios from "axios";
import { list } from "postcss";
import { useQuery } from "@tanstack/react-query";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  // const [pokemon, setPokemon] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios.get("https://pokeapi.co/api/v2/pokemon").then((result) => {
  //     setPokemon(result.data.results);
  //     setIsLoading(false);
  //   });
  // }, []);

  const { data, isFetching } = useQuery({
    queryKey: ["pokemon-list"],
    queryFn: () => axios.get("https://pokeapi.co/api/v2/pokemon"),
    refetchOnWindowFocus: false,
  });

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        data?.data.results.map((item) => <li key={item.name}>{item.name}</li>)
      )}
    </div>
  );
}
