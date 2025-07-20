import { HeroLoading } from "@/components/global/LoadingContainer";
import Categories from "@/components/home/Categories";
import PropertiesContainer from "@/components/home/PropertiesContainer";
import React, { Suspense } from "react";



async function Home({searchParams}: any) {

  const {search} = await searchParams || '';
  const { category} = await searchParams || '';

  return (
    <section className="p-10">
      <Categories category={category} search={search}/>
      <Suspense fallback={<HeroLoading />}>
        <PropertiesContainer search={search} category={category}/>
      </Suspense>
    </section>
  )
}

export default Home