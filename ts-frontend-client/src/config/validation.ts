import _ from "lodash";

interface HasName {
  name?: string
}

export const isUniqueName = <T extends HasName>(list: T[], value: string, currentObjectIndex?: number ): boolean =>
  ! _.some(list, (listItem, index: number) => listItem.name === value && (currentObjectIndex === undefined || listItem !== list[currentObjectIndex]))
