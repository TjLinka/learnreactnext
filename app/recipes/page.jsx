import MyApi from "@/assets/MyApi";
import RecipeCard from "@/components/Recipe/RecipeCard";
import { cookies } from "next/headers";

export default async function RecipeCatalog() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")
    ? cookieStore.get("token").value
    : null;

  const res = await MyApi.post(
    "/api/partner/catalog/get-catalog-bytyp",
    {
      i_typ: 3,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        access_token: `Bearer ${token}`,
      },
    }
  ).catch((error) => {});
  const recipes = res.data;

  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        {recipes?.map?.((r) => {
          return <RecipeCard key={r.id} recipe={r} />;
        })}
      </div>
    </div>
  );
}
