function gqlQuery(query: string) {
  return JSON.stringify({ query });
}

export const raceList = gqlQuery(`
  query Races {
    races {
      index
      name
      speed
      size
      ability_bonuses {
        ability_score {
          name
        }
        bonus
      }
      languages {
        name
      }
      subraces {
        race {
          index
        }
        ability_bonuses {
          ability_score {
            name
          }
          bonus
        }
        name
        index
      }
    }
  }
`);

export const classList = gqlQuery(`
  query Classes {
    classes {
      index
      name
      hit_die
      saving_throws {
        name
      }
    }
  }
`);
