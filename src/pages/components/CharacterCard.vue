<script setup lang="ts">
import {CharacterData} from "../../types/api.ts";

defineProps<{
  character: CharacterData
}>()
</script>

<template>
  <div class="h-max flex flex-col shrink-0 bg-blue-950 rounded-lg shadow-lg overflow-hidden z-10">
    <div class="relative">
      <img :src="character.image" :alt="character.name" class="w-full h-72 object-cover" />
      <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-950 to-transparent"></div>
    </div>

    <div class="p-4 text-yellow-500">
      <h2 class="text-xl font-bold mb-2 text-yellow-500">{{ character.name }}</h2>
      <p class="text-sm mb-1">
        <span class="font-semibold">Status:</span> {{ character.status }}
      </p>
      <p class="text-sm mb-1">
        <span class="font-semibold">Species:</span> {{ character.species }}
      </p>
      <p class="text-sm mb-1">
        <span class="font-semibold">Gender:</span> {{ character.gender }}
      </p>
      <p class="text-sm">
        <span class="font-semibold">Location:</span> {{ character.location.name }}
      </p>
    </div>
  </div>
</template>