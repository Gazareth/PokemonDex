import pick from "lodash/pick";
import get from "lodash/get";
import last from "lodash/last";
import isEmpty from "lodash/isEmpty";
import startCase from "lodash/startCase";

const statNameMap = {
  hp: [0, "HP"],
  attack: [1, "Attack"],
  defense: [2, "Defense"],
  speed: [3, "Speed"],
  "special-attack": [4, "Special Attack"],
  "special-defense": [5, "Special Defense"],
};

const extractVersionNumber = ({ version: ver }) =>
  parseInt(last(ver.url.split("/"))) || 0;

const parseData_Pokemon = (
  pokemonData,
  varietyData,
  pokemonEvolutionsData,
  pokemonMovesData
) => {
  const SpeciesVersions = get(pokemonData, "flavor_text_entries", []).filter(
    (entry) => entry.language.name === "en" && !isEmpty(entry.flavor_text)
  );
  const SpeciesFlavorText = last(
    SpeciesVersions.sort(
      (a, b) => extractVersionNumber(b) - extractVersionNumber(a)
    )
  ).flavor_text;

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
    name: startCase(pokemonData.name),
    id: pokemonData.id,
    image: varietyData.sprites.front_default,
    types: varietyData.types.map((typeObj) => startCase(typeObj.type.name)),
    physique: pick(varietyData, ["height", "weight"]),
    stats: varietyData.stats
      .map((statObj) => ({
        order: statNameMap[statObj.stat.name][0],
        name: statNameMap[statObj.stat.name][1],
        value: statObj.base_stat,
      }))
      .sort((a, b) => a.order - b.order),
    species: {
      name: startCase(pokemonData.name),
      flavorText: SpeciesFlavorText,
      genus: PikachuGenus[0].genus,
      gender: pokemonData.gender_rate,
    },
    evolutions: pokemonEvolutionsData.map((evolPkmn) => ({
      id: evolPkmn.id,
      name: startCase(evolPkmn.name),
      img: evolPkmn.sprites.front_default,
    })),
    moves: pokemonMoves.map((moveObj) => ({
      name: startCase(moveObj.move.name),
      level: moveObj.version_group_details[0].level_learned_at,
      type: startCase(
        pokemonMovesData.filter(
          (moveDataObj) =>
            moveDataObj.id === Number(moveObj.move.url.split("/").slice(-2)[0])
        )[0].type.name
      ),
    })),
    items: varietyData.held_items.map((itemObj) =>
      startCase(itemObj.item.name)
    ),
    abilities: varietyData.abilities.map(({ ability }) =>
      startCase(ability.name)
    ),
  };
};

export default parseData_Pokemon;
