"use server";
import Button from "@/components/Button";
import Title from "@/components/Title";
import Image from "next/image";
import ArrowBack from "../public/icons/arrow-right.svg";
import RecipeCard from "@/components/Recipe/RecipeCard";
import MyApi from "@/assets/MyApi";
import Link from "next/link";

export default async function MainPage() {
  const res = await MyApi.post("/api/partner/catalog/get-catalog-bytyp", {
    i_typ: 3,
  })
    .then((Response) => {
      return Response.data.reverse().splice(0, 8);
    })
    .catch((error) => {
      console.log(error.response);
    });
  return (
    <div>
      {/* ГРАНДШЕФ */}
      <section>
        <div className="flex items-stretch justify-between gap-4">
          <div className="w-1/5 bg-white rounded-xl p-4 shadow-sm">
            <Image src="./icons/globe.svg" width={24} height={24} alt="icon" />
            <p className="mt-2.5 text-xl">Эксклюзивно в России</p>
          </div>
          <div className="w-1/5 bg-white rounded-xl p-4 shadow-sm">
            <Image src="./icons/docs.svg" width={24} height={24} alt="icon" />
            <p className="mt-2.5 text-xl">100 страниц рецептов</p>
          </div>
          <div className="w-1/5 bg-white rounded-xl p-4 shadow-sm">
            <Image src="./icons/blocks.svg" width={24} height={24} alt="icon" />
            <p className="mt-2.5 text-xl">16 функций в одном</p>
          </div>
          <div className="w-1/5 bg-white rounded-xl p-4 shadow-sm">
            <Image
              src="./icons/orange_heart.svg"
              width={24}
              height={24}
              alt="icon"
            />
            <p className="mt-2.5 text-xl">Призы за покупку</p>
          </div>
          <div className="w-1/5 bg-(--orange) rounded-xl p-4 shadow-sm flex items-center justify-between">
            <p className="text-xl text-white leading-[100%]">
              Инструкция <br /> и описание
            </p>
            <Image
              src="./icons/arrow-right_white.svg"
              width={24}
              height={24}
              alt="icon"
            />
          </div>
        </div>
      </section>
      {/* Новые рецепты */}
      <section className="mt-[100px]">
        <div className="flex justify-between">
          <div className="w-2/3">
            <div className="flex justify-between items-center">
              <Title size="5xl">Новые рецепты</Title>
              <Link href={"/recipes"}>
                <Button classnName="bg-white">
                  <div className="flex gap-2.5">
                    <span>Все рецепты</span>
                    <Image src={ArrowBack} alt="" />
                  </div>
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-7">
              {res?.map?.((r) => {
                return <RecipeCard key={r.id} recipe={r} />;
              })}
            </div>
          </div>
          <div className="max-w-[429px] w-full bg-white rounded-[26px] p-6">
            <Title size="3xl">рецепт дня</Title>
          </div>
        </div>
      </section>
    </div>
  );
}
