import { getOpendtdbApiData } from "../api/get-opendtdb-api-data";
import { useEffect, useState } from "react";
function ChooseCategory(props) {
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    getCategoriesData();
  }, []);

  async function getCategoriesData() {
    const responseApi = await getOpendtdbApiData(`/api_category.php`);
    const categoriesData = responseApi.trivia_categories;
    categoriesData.unshift({ id: null, name: "All Categories" });
    setCategoriesList(categoriesData);
  }

  return (
    <div className="ChooseCategory w-full flex flex-col items-center">
      <p className="font-bold text-2xl mb-4">Choose your Category:</p>
      <div className="flex flex-wrap">
        {categoriesList.map((category, index) => (
          <button className="m-2" onClick={() => props.setCategory(category.id)} key={index}>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
export default ChooseCategory;
