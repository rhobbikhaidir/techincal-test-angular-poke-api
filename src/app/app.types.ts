
export type ResultPokemonProps = {
    name: string,
    url: string
}

export type ResponsePokemonProps = {
    count: number;
    next: string;
    previous: string | null;
    results: ResultPokemonProps[]
}



export type TypePokemonsProps = {
    slot: number;
    type: {
        name: string;
        url: string;
    }
}


export type AbilitiesPokemonProps = {
        ability: {
          name: string;
          url: string;
        };
        is_hidden: boolean;
        slot: number;
}


export type DetailListProps = {
    name: string;
    abilities: string;
    height: number;
    weight: number;
    type: string;
    moves: any[]
}