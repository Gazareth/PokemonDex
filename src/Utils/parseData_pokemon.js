import pick from "./pick";

export const capitalise = (string, separators = [" ", "-"]) => {
  var regex = new RegExp("(^|[" + separators.join("") + "])(\\w)", "g");
  return string.toLowerCase().replace(regex, function (x) {
    return x.toUpperCase();
  });
};

const statNameMap = {
  hp: [0, "HP"],
  attack: [1, "Attack"],
  defense: [2, "Defense"],
  speed: [3, "Speed"],
  "special-attack": [4, "Special Attack"],
  "special-defense": [5, "Special Defense"],
};

const parseData_Pokemon = (
  pokemonData,
  varietyData,
  pokemonEvolutionsData,
  pokemonMovesData
) => {
  const SpeciesFlavorText = pokemonData.flavor_text_entries.filter(
    (entry) =>
      entry.language.name === "en" && entry.version.name === "alpha-sapphire"
  )[0].flavor_text;

  const PikachuGenus = pokemonData.genera.filter(
    (entry) => entry.language.name === "en"
  );

  const pokemonMoves = varietyData.moves
    .filter((moveObj) =>
      moveObj.version_group_details.some(
        (versionObj) => versionObj.move_learn_method.name === "level-up"
      )
    )
    .sort(
      (moveA, moveB) =>
        moveA.version_group_details[0].level_learned_at >
        moveB.version_group_details[0].level_learned_at
    );

  return {
    name: capitalise(pokemonData.name),
    id: pokemonData.id,
    image: varietyData.sprites.front_default,
    types: varietyData.types.map((typeObj) => capitalise(typeObj.type.name)),
    physique: pick(varietyData, ["height", "weight"]),
    stats: varietyData.stats
      .map((statObj) => ({
        order: statNameMap[statObj.stat.name][0],
        name: statNameMap[statObj.stat.name][1],
        value: statObj.base_stat,
      }))
      .sort((a, b) => a.order - b.order),
    species: {
      name: capitalise(pokemonData.name),
      flavorText: SpeciesFlavorText,
      genus: PikachuGenus[0].genus,
    },
    evolutions: pokemonEvolutionsData.map((evolPkmn) => ({
      id: evolPkmn.id,
      name: capitalise(evolPkmn.name),
      img: evolPkmn.sprites.front_default,
    })),
    moves: pokemonMoves.map((moveObj) => ({
      name: capitalise(moveObj.move.name),
      level: moveObj.version_group_details[0].level_learned_at,
      type: capitalise(
        pokemonMovesData.filter(
          (moveDataObj) =>
            moveDataObj.id === Number(moveObj.move.url.split("/").slice(-2)[0])
        )[0].type.name
      ),
    })),
    items: varietyData.held_items.map((itemObj) =>
      capitalise(itemObj.item.name)
    ),
  };
};

export default parseData_Pokemon;
