import FoodIndex from "@/components/food_index";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
       <main className="flex min-h-screen flex-col items-center justify-between p-24">
         <FoodIndex />
       </main>
     </>

  );
}
