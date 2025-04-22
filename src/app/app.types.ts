
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


