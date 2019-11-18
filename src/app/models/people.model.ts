export class People {
    name: string;
    gender: string;
    starships: string[];
    homeworld: string;
    species: string[];
    url: string;
    ships: any[];
    home: string;
    speciesNames: any[];
    filmNames: any[];
    films: any[];
}

export class Film {
    url: string;
    title: string;
    description: string;
    characters: Array<string>;
}

export class Starship {
    url: string;
    name: string;
    manufacturer: string;
    model: string;
    pilots: Array<string>;
}

export class Species {
    people: Array<string>;
    designation: string;
    language: string;
    classification: string;
    url: string;
    name: string;
}

export class Planet {
    residents: Array<string>;
    url: string;
    name: string;
    climate: string;
    gravity: string;
    population: string;
}

export class PaginationResponse<T> {
    totalRecords: number;
    result: Array<T>;
}

export class ComicStore {
    address: string;
    name: string;
}

