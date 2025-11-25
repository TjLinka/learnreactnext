import Image from "next/image";
import Link from "next/link";

export default function RecipeCard({ recipe }) {
  return (
    <div>
      <div className="rounded-[14px] overflow-hidden relative">
        <Link href={`/recipes/${recipe.id}`}>
          <Image
            src={recipe.image_url}
            alt="Recipe Image"
            width={600}
            height={600}
            className="h-[234px] w-full object-cover aspect-square"
          />
        </Link>
        <div className="absolute top-1.5 left-1.5 bg-white px-2 rounded-[100px] flex gap-0.5 items-center">
          <Image
            src={"./icons/star.svg"}
            alt="Review Star"
            width={16}
            height={16}
          />
          <span className="text-[15px]">
            {recipe.avg_rating ? avg_rating : "Нет оценок"}
          </span>
        </div>
        <div className="absolute top-1.5 right-1.5 cursor-pointer">
          <Image
            src={"./icons/heart.svg"}
            alt="Review Star"
            width={16}
            height={16}
          />
        </div>
        <div className="absolute backdrop-blur-xs rounded-[100px] bottom-1.5 left-1.5 border border-white px-2 text-white ">
          <span className="text-[15px]">{recipe?.properties[4]?.val} мин</span>
        </div>
      </div>
      <div className="text-[15px] leading-[100%] mt-2">
        <Link href={`/recipes/${recipe.id}`}>{recipe.name}</Link>
      </div>
    </div>
  );
}
