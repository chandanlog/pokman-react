// // ** Function For Capitalize First Letter
export const capitalizeFirstLetter = (str) => {
  let capitalized = "";
  if (str) {
    capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  }

  return capitalized;
};

export const fetchPokemons = async ({
  page = 1,
  limit = 20,
  searchTerm = "",
  showFav = false,
} = {}) => {
  try {
    let url = `http://localhost:5001/api/v1/pokemon?page=${page}&limit=${limit}`;

    if (searchTerm) url += `&searchTerm=${searchTerm}`;
    if (showFav) url += `&showFavourite=${showFav}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon data");
    }

    const data = await response.json();
    console.log("✅ Fetched Pokémon from DB:", data);

    return data?.data || [];
  } catch (error) {
    console.error("❌ Error fetching Pokémon from DB:", error);
    return [];
  }
};

export const updateFavorites = async (pokemon) => {
  try {
    const isFavorite = pokemon.is_favourite === "1" ? "0" : "1";

    const response = await fetch(
      `http://localhost:5001/api/v1/pokemon/${pokemon.id}/favourite/${isFavorite}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_favourite: isFavorite }), // ✅ Use correct key
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update favorite status");
    }

    console.log("✅ Favorite updated successfully:", data);

    return { ...pokemon, is_favourite: isFavorite }; // ✅ Return updated Pokémon
  } catch (error) {
    console.error("❌ Error updating favorite status:", error);
  }
};
// ** Function For Capitalize First Letter