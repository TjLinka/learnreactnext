"use client";
import Button from "@/components/Button";
import InputPassword from "@/components/InputPassword";
import InputText from "@/components/InputText";
import Title from "@/components/Title";
import axios from "axios";
import { setToken } from "../lib/actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSumbit = async (e) => {
    e.preventDefault();
    axios
      .post("https://back.grandchef.info/api/partner/Agent/login", {
        login: "120",
        password: "827ccb0eea8a706c4c34a16891f84e7b",
      })
      .then(async (Response) => {
        await setToken(Response.data.access_token);
        router.push("/");
      });
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col max-w-[360px] w-full">
        <Title center size="5xl">
          ВХОД
        </Title>
        <p className="text-center text-lg mt-4">
          Нет аккаунта?{" "}
          <span className="text-(--orange) underline cursor-pointer">
            Зарегистрироваться
          </span>
        </p>
        <form className="mt-8" onSubmit={handleSumbit}>
          <InputText className="w-full mb-3" placholder="Телефон/почта" />
          <InputPassword className="w-full mb-3" placholder="Пароль" />
          <Button classnName="bg-[#0D0908] text-white w-full">Войти</Button>
        </form>
      </div>
    </div>
  );
}
