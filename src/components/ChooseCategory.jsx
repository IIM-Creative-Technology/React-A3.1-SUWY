import { getApi } from "../api/get-api";
import { useEffect, useState } from "react";
function ChooseCategory(props) {
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    getCategoriesData();
  }, []);

  async function getCategoriesData() {
    const responseApi = await getApi(`/api_category.php`);
    const categoriesData = responseApi.trivia_categories;
    categoriesData.unshift({ id: null, name: 'All Categories' });
    setCategoriesList(categoriesData);
  };

  return (
    <div className="ChooseCategory">
      <p>Choose your Category</p>
      {categoriesList.map((category, index) => (
        <button
          onClick={() =>
            props.setCategory(category.id)}
          key={index}>{category.name}</button>
      ))}
    </div>
  )
}
export default ChooseCategory