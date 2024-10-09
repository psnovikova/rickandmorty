import {defineStore} from 'pinia';
import {ref} from 'vue';
import {getAllCharacters, getCharactersByLocationId, getLocations} from '../api';
import {CharacterData, Location} from '../types/api.ts';

export const useCharacterStore = defineStore('characterStore', () => {
    const characters = ref<CharacterData[]>([]);
    const locations = ref<Location[]>([]);
    const nextPageUrl = ref<string | null>(null);

    const fetchCharacters = async (
        pageUrl?: string,
        filter: { name?: string; locationId?: number } = {},
        page: number = 1
    ) => {
        try {
            if (filter.locationId) {
                const charactersFromLocation = await getCharactersByLocationId(filter.locationId, page);
                characters.value = [...characters.value, ...charactersFromLocation];

                if (charactersFromLocation.length === 20) {
                    nextPageUrl.value = 'next';
                } else {
                    nextPageUrl.value = null;
                }
            } else {
                const response = await getAllCharacters(pageUrl,
                    {name: filter?.name || ''});
                characters.value = [...characters.value, ...response.results];
                nextPageUrl.value = response.info.next;
            }
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    };

    const fetchLocations = async () => {
        try {
            locations.value = await getLocations();
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    return {
        characters,
        locations,
        nextPageUrl,
        fetchCharacters,
        fetchLocations,
    };
});
