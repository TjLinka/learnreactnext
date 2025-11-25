"use server";
import Title from "@/components/Title";
import axios from "axios";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function RecipePage({ params }) {
  // Cookies and Headers
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  const requestHeaders = {
    withCredentials: true,
    headers: {
      common: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "access-token": `Bearer ${token}`,
      },
      withCredentials: true,
    },
  };

  const { id } = await params;
  const recipe = await axios
    .get(
      `https://back.grandchef.info/api/partner/Catalog/get-single/${id}`,
      requestHeaders
    )
    .then((Response) => {
      return Response.data;
    });
  const ingr = await axios
    .get(
      `https://back.grandchef.info/api/partner/Catalog/${id}/get-catalog-consist`,
      requestHeaders
    )
    .then((Response) => {
      return Response.data;
    });
  const steps = await axios
    .post(
      "https://back.grandchef.info/api/partner/Catalog/get-catalog-materials",
      { catalog_id: id },
      requestHeaders
    )
    .then((Response) => {
      return Response.data;
    });

  return (
    <>
      <div className="bg-white rounded-2xl p-5 flex gap-10">
        <div className="roundex-2xl overflow-hidden w-1/3">
          <Image
            src={recipe.image_urls[0]}
            alt="Recipe Image"
            width={600}
            height={600}
            className="h-[396px] w-full aspect-square object-cover rounded-2xl"
          />
        </div>
        <div className="w-2/3">
          <div className="flex flex-col justify-between h-full">
            <Title size="5xl">{recipe.name}</Title>
            <div className="grow mt-5 text-lg text-[#6C6867] font-normal">
              {recipe.adv_desc}
            </div>
            <div className="bg-[#F7F5F5] rounded-xl p-1.5 pt-2.5">
              <p className="pl-1.5 text-[15px] font-normal text-[#6C6867]">
                На 100 г продукта
              </p>
              <div className="flex gap-1.5 justify-between mt-2.5">
                <div className="bg-white rounded-lg w-1/4 px-2 py-[5px]">
                  <p className="text-[15px] font-normal text-[#B7B0AF]">Ккал</p>
                  <p className="font-semibold text-lg">253</p>
                </div>
                <div className="bg-white rounded-lg w-1/4 px-2 py-[5px]">
                  <p className="text-[15px] font-normal text-[#B7B0AF]">
                    Белки
                  </p>
                  <p className="font-semibold text-lg">18,39</p>
                </div>
                <div className="bg-white rounded-lg w-1/4 px-2 py-[5px]">
                  <p className="text-[15px] font-normal text-[#B7B0AF]">Жиры</p>
                  <p className="font-semibold text-lg">19,95</p>
                </div>
                <div className="bg-white rounded-lg w-1/4 px-2 py-[5px]">
                  <p className="text-[15px] font-normal text-[#B7B0AF]">
                    Углеводы
                  </p>
                  <p className="font-semibold text-lg">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start lg:flex-row flex-col gap-10 mt-[60px]">
        <div className="lg:sticky top-0 w-1/3">
          <h1 className="font-c lg:text-[44px] text-[22px]">Приготовление</h1>
          {/* <!-- Ингредиенты --> */}
          <div className="mt-8" v-show="ingr.length">
            <p className="font-semibold lg:text-[20px] text-[18px] mb-3">
              Ингредиенты
            </p>
            {ingr?.map?.((i, index) => {
              return (
                <div key={index}>
                  <div className="flex justify-between">
                    <span className="text-[#6C6867] text-[15px]">{i.name}</span>
                    <span className="font-semibold">
                      {i.qty || ""} {i.measure_name}
                    </span>
                  </div>
                  <div className="w-full h-px bg-[#0D090814] my-3"></div>
                </div>
              );
            })}
          </div>
          {/* <!-- Настройки -->
        <!-- Ингредиенты --> */}
          <div className="mt-7">
            <p className="font-semibold text-[20px] mb-3">Настройки</p>
            <div className="flex justify-between">
              <span className="text-[#6C6867] text-[15px]">Режим</span>
              {/* <strong>{{ modeName }}</strong> */}
            </div>
            <div
              className="w-full h-px bg-[#0D090814] my-3"
              v-show="temputure !== ''"
            ></div>
            <div className="flex justify-between" v-show="temputure !== ''">
              <span className="text-[#6C6867] text-[15px]">Температура</span>
              {/* <strong>{{ temputure }}</strong> */}
            </div>
            <div
              className="w-full h-px bg-[#0D090814] my-3"
              v-show="time !== ''"
            ></div>
            <div className="flex justify-between" v-show="time !== ''">
              <span className="text-[#6C6867] text-[15px]">Время</span>
              {/* <strong>{{ makeTime }}</strong> */}
            </div>
          </div>
        </div>
        {/* <!-- ШАГИ --> */}

        <div className="flex flex-col gap-10 w-2/3">
          {steps?.map?.((s, i) => {
            return (
              <div className="bg-white rounded-xl shadow-sm pb-2" key={i}>
                {s.img_url &&
                  s.img_url !==
                    "https://image.grandchef.info/img/upload/empty.png" && (
                    <div className="rounded-xl h-full">
                      <Image
                        src={s.img_url}
                        width={500}
                        height={500}
                        alt=""
                        className="max-h-[400px] w-full object-cover rounded-xl"
                      />
                    </div>
                  )}
                <div className="px-4 mt-5">
                  <p className="font-c">ШАГ {i + 1}</p>
                  <div className="leading-[100%] mt-2 text-[#6C6867] ck-content ck">
                    {s.contentutf}
                  </div>
                </div>
              </div>
            );
          })}
          {/* <div class="bg-white rounded-xl shadow-sm pb-2" v-for="(s, i) in steps" :key="i">
            <div
                class="rounded-xl h-full"
                v-show="s.img_url && s.img_url !== 'https://dev-img.gleb.team/img/upload/empty.png'"
            >
                <img :src="s.img_url" alt="" class="max-h-[400px] w-full object-cover rounded-xl" />
            </div>
            <div class="px-4 mt-5">
                <p class="font-c">ШАГ {{ i + 1 }}</p>
                <div
                class="leading-[100%] mt-2 text-[#6C6867] ck-content ck"
                v-html="s.contentutf"
                ></div>
            </div>
            </div> */}
        </div>
      </div>
    </>
  );
}
