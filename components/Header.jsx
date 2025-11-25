import Image from "next/image";
import Logo from "../public/imgs/logo.svg";
import Login from "../public/icons/login-square.svg";
import Button from "./Button";
import Link from "next/link";

export default function Header() {
  return (
    <div className="py-[22px] top-0 bg-[#f7f5f5]">
      <header className="container mx-auto px-[15px] flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="px-10 py-5.5 bg-white rounded-xl flex flex-col gap-1 cursor-pointer">
            <span className="bg-(--orange) w-[15px] h-0.5 rounded-2xl"></span>
            <span className="bg-(--orange) w-[15px] h-0.5 rounded-2xl"></span>
          </div>
          <div className="cursor-pointer">
            <Image src={Logo} alt="Logo" />
          </div>
        </div>
        <div>
          <Link href={"/login"}>
            <Button classnName="text-white">
              <div className="flex items-center gap-2 ">
                <Image src={Login} alt="login" />
                <span className=" leading-[120%]">Войти</span>
              </div>
            </Button>
          </Link>
        </div>
      </header>
    </div>
  );
}
