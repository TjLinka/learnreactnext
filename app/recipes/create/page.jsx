"use client";

import { getToken } from "@/app/lib/actions";
// import MyApi from "@/assets/MyApi";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import { Select } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useImmer } from "use-immer";

export default function CreateRecipePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [kbzu, setKBZU] = useImmer({
    k: 0,
    u: 0,
    z: 0,
    b: 0,
  });
  // Вид блюда
  const [recipeTypeList, setRecipeListType] = useState([]);
  const [recipeType, setRecipeType] = useState(null);
  // Кухня блюда
  const [recipeKitchenList, setRecipeKitchenList] = useState([]);
  const [recipeKichenType, setRecipeKichenType] = useState(null);

  // onMounted
  useEffect(() => {
    // async function getData() {
    //   await MyApi.post("/api/partner/Catalog/sections", {
    //     group_id: 360,
    //     parent_id: null,
    //   }).then((Response) => {
    //     setRecipeListType(Response.data);
    //   });
    //   await MyApi.post("/api/partner/Catalog/sections", {
    //     group_id: 370,
    //     parent_id: null,
    //   }).then((Response) => {
    //     setRecipeKitchenList(Response.data);
    //   });
    // }
    // getData();
  }, []);

  // Методы
  const handleKBZUChange = (val, key) => {
    setKBZU((draft) => {
      draft[key] = val;
    });
  };

  const createRecipe = async () => {
    const token = await getToken();
    const formData = new FormData();
    formData.append("name", name);
    formData.append(
      "propertiesList",
      JSON.stringify([
        { field_id: 1, value: "" },
        { field_id: 2, value: "" },
        { field_id: 3, value: "" },
        { field_id: 4, value: "" },
        { field_id: 6, value: "" },
        { field_id: 8, value: "" },
        { field_id: 10, value: "" },
      ])
    );
    formData.append(
      "categories",
      JSON.stringify([{ id: null }, { id: null }, { id: null }, { id: null }])
    );
    formData.append("properties", null);
    formData.append("category", '');
    formData.append("adv_desc", "");
    formData.append("price", 10);
    formData.append("pricex", 10);
    formData.append("short_desc", '2131');
    formData.append("section", 1);
    formData.append("show_lk", 0);
    formData.append("visible", 1);
    formData.append("video_url", null);
    formData.append("typ", 3);
    formData.append("articul", "123");
    formData.append("adv_desc", "Тестовый рецепт из React(Next.js)");
    await MyApi({
      method: "post",
      url: "/api/partner/Catalog/update-catalog-item",
      data: formData,
      headers: {
        common: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          "access-token": `Bearer ${token}`,
        },
      },
    });
    router.push("/recipes");
  };

  return (
    <>
      <div className="flex gap-5">
        <div className="w-1/2">
          <div className="w-full">
            <p>
              Название блюда <span className="text-red-500">*</span>
            </p>
            <InputText
              className="w-full mt-1"
              onInput={(val) => setName(val)}
            />
            {name}
          </div>
          {/* Вид и Кухня */}
          <div className="flex gap-5 justify-between mt-5">
            <div className="w-1/2">
              <Select
                placeholder="Укажите вид блюда"
                allowClear
                style={{ width: "100%" }}
                onChange={(val) => {
                  setRecipeType(val);
                }}
                options={[
                  ...recipeTypeList?.map?.((t) => {
                    return {
                      value: t.id,
                      label: t.name,
                    };
                  }),
                ]}
              />
              {recipeType} <br />
              {recipeKichenType}
            </div>
            <div className="w-1/2">
              <Select
                placeholder="Укажите кухню блюда"
                allowClear
                style={{ width: "100%" }}
                onChange={(val) => {
                  setRecipeKichenType(val);
                }}
                options={[
                  ...recipeKitchenList?.map?.((t) => {
                    return {
                      value: t.id,
                      label: t.name,
                    };
                  }),
                ]}
              />
            </div>
          </div>
          {/* КБЖУ */}
          <div className="mt-5">
            <p>КБЖУ блюда (на 100 гр.)</p>
            <div className="flex gap-3 justify-between mt-1">
              <InputText
                className="w-1/4"
                placholder="Ккал"
                onInput={(val) => {
                  handleKBZUChange(val, "k");
                }}
              />
              <InputText
                className="w-1/4"
                placholder="Углеводы"
                onInput={(val) => {
                  handleKBZUChange(val, "u");
                }}
              />
              <InputText
                className="w-1/4"
                placholder="Жиры"
                onInput={(val) => {
                  handleKBZUChange(val, "z");
                }}
              />
              <InputText
                className="w-1/4"
                placholder="Белки"
                onInput={(val) => {
                  handleKBZUChange(val, "b");
                }}
              />
            </div>
          </div>
          {/* Ингредиенты  */}
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="w-1/2"></div>
      </div>
      <Button classnName="text-white mt-4" onClick={createRecipe}>
        Создать рецепт
      </Button>
    </>
  );
}
