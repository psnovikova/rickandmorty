export interface LocationData extends Location {
    residents: string[], // List of character who have been last seen in the location.
    url: string, // Link to the location's own endpoint.
    created: string, //Time at which the location was created in the database.
}

export interface Location {
    id: number, // id of the location.
    name: string, // The name of the location.
    type: string, // The type of the location.
    dimension: string, // The dimension in which the location is located.
}

export interface CharacterData extends Location {
    id: number, // The id of the character.
    name: string, // The name of the character.
    status: string, // The status of the character ('Alive', 'Dead' or 'unknown').
    species: string, // The species of the character.
    type: string, // The type or subspecies of the character.
    gender: string, // The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').
    origin: object, // Name and link to the character's origin location.
    location: object, // Name and link to the character's last known location endpoint.
    image: string, // (url)	Link to the character's image. All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
    episode: string[], // (urls) List of episodes in which this character appeared.
    url: string, // (url) Link to the character's own URL endpoint.
    created: string, //	Time at which the character was created in the database.
}