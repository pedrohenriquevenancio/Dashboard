import { CharacterType } from "./CharacterType";

export interface HogwartsHouseType {
  house: string,
  emoji: string,
  founder: string,
  colors: Array<string>,
  animal: string,
  characters: null | Array<CharacterType>,
}
