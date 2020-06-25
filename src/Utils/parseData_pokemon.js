import { filterObject as filterObj } from "./filterObject";

const capitalise = (string) => {
  return string[0].toUpperCase() + string.substr(1);
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
  pokemonSpeciesData,
  pokemonMovesData
) => {
  const SpeciesFlavorText = pokemonSpeciesData.flavor_text_entries.filter(
    (entry) =>
      entry.language.name === "en" && entry.version.name === "alpha-sapphire"
  )[0].flavor_text;

  const PikachuGenus = pokemonSpeciesData.genera.filter(
    (entry) => entry.language.name === "en"
  );

  const pokemonMoves = pokemonData.moves
    .filter((moveObj) =>
      moveObj.version_group_details.reduce(
        (canLearn, versionObj) =>
          canLearn || versionObj.move_learn_method.name === "level-up",
        false
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
    image: pokemonData.sprites.front_default,
    types: pokemonData.types
      .map((typeObj) => typeObj.type.name)
      .map((typeName) => capitalise(typeName)),
    physique: filterObj(pokemonData, ["height", "weight"]),
    stats: pokemonData.stats
      .map((statObj) => ({
        order: statNameMap[statObj.stat.name][0],
        name: statNameMap[statObj.stat.name][1],
        value: statObj.base_stat,
      }))
      .sort((a, b) => a.order - b.order),
    species: {
      name: capitalise(pokemonSpeciesData.name),
      flavorText: SpeciesFlavorText,
      genus: PikachuGenus[0].genus,
    },
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
    items: pokemonData.held_items.map((itemObj) =>
      capitalise(itemObj.item.name)
    ),
  };
};

export default parseData_Pokemon;
