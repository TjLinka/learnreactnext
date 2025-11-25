"use server";
import MyApi from "@/assets/MyApi";
import RecipeCard from "@/components/Recipe/RecipeCard";

export default async function RecipeCatalog() {
  const res = await MyApi.post("/api/partner/catalog/get-catalog-bytyp", {
    i_typ: 3,
  }).catch((error) => {});
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
