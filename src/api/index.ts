import axios from 'axios';
import {mapLocations} from "./mappers.ts";
import {CharacterData, Location} from "../types/api.ts";

const instance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAllCharacters = async (
    pageUrl: string | null = null,
    filters: { name?: string; locationId?: string } = {}
): Promise<{ results: CharacterData[]; info: any }> => {
    try {
        let url = pageUrl ? pageUrl : '/character';
        const params: Record<string, string> = {};

        if (filters.name) {
            params.name = filters.name;
        }

        if (filters.locationId) {
            params.location = filters.locationId;
        }

        const response = await instance.get(url, {params});
        return response.data;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
};


export const getCharactersByLocationId = async (
    locationId: number,
    page: number = 1,
    limit: number = 20
): Promise<CharacterData[]> => {
    try {
        const response = await instance.get(`/location/${locationId}`);
        const residents = response.data.residents;
        const start = (page - 1) * limit;
        const end = start + limit;

        const paginatedResidents = residents.slice(start, end);

        const characterRequests = paginatedResidents.map((url: string) => instance.get(url));
        const charactersResponses = await Promise.all(characterRequests);

        return charactersResponses.map(res => res.data);
    } catch (error) {
        console.error(`Error fetching characters from location with ID ${locationId}:`, error);
        throw error;
    }
};

export const getCharacterById = async (id: number) => {
    try {
        const response = await instance.get(`/character/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching character with ID ${id}:`, error);
        throw error;
    }
};

export const getLocations = async (): Promise<Location[]> => {
    try {
        const response = await instance.get(`/location`);
        return mapLocations(response.data.results)
    } catch (error) {
        console.error(`Error fetching location:`, error);
        throw error;
    }
}
