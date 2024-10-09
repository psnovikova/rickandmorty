<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useInfiniteScroll} from '@vueuse/core';
import LocationFilter from './components/LocationFilter.vue';
import CharacterCard from './components/CharacterCard.vue';
import ParallaxLight from "../components/ParallaxLight.vue";
import {useCharacterStore} from "../stores/characterStore.ts";
import {storeToRefs} from 'pinia';
import SearchBar from "./components/SearchBar.vue";

const characterStore = useCharacterStore();

const {characters, nextPageUrl} = storeToRefs(characterStore);
const {fetchCharacters, fetchLocations} = characterStore;

const scrollContainer = ref<HTMLElement | null>(null);

const selectedLocationId = ref('');
const searchName = ref('');
const currentPage = ref(1);

useInfiniteScroll(
    scrollContainer,
    async () => {
      if (nextPageUrl.value) {
        currentPage.value++;
        await fetchCharacters(nextPageUrl.value, {
          name: searchName.value,
          locationId: selectedLocationId.value
        }, currentPage.value);
      }
    },
    {distance: 10}
);

const handleSearch = async () => {
  selectedLocationId.value = '';
  characters.value = [];
  nextPageUrl.value = null;
  currentPage.value = 1;

  try {
    await fetchCharacters(null, {name: searchName.value});
  } catch (error) {
    console.error('Error filtering characters by name:', error);
  }
};

const handleLocationFilter = async (locationId: string) => {
  searchName.value = '';
  selectedLocationId.value = locationId;
  characters.value = [];
  nextPageUrl.value = null;

  try {
    await fetchCharacters(null, {locationId});
  } catch (error) {
    console.error('Error filtering characters by location:', error);
  }
};

onMounted(async () => {
  await fetchCharacters(null, {}, currentPage.value);
  await fetchLocations();
});
</script>

<template>
  <div ref="scrollContainer"
       id="characters-container"
       class="h-screen w-full mx-auto overflow-y-auto py-8 px-12">
    <div class="flex flex-col md:flex-row mb-4 justify-between md:space-x-4">
      <SearchBar v-model="searchName" @search="handleSearch"/>
      <LocationFilter @filter="handleLocationFilter"/>
    </div>

    <transition-group name="fade" tag="div" class="grid h-full shrink-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-auto-rows-[1fr]">
      <CharacterCard
          v-for="character in characters"
          :key="character.id"
          :character="character"
      />
    </transition-group>

    <ParallaxLight/>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
