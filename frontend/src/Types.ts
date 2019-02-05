export interface IGetPokemonQueryParams{    
    PokemonsQueryInput:{
        limit?: number,
        offset?: number,
        search?: string,
        filter?: Object,
    }
}

export type TabType = 'all' | 'favorite' | null;