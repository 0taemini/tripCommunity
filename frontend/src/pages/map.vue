<template>
  <MapSearchBar />
  <KakaoMapWrapper />
  <ChatBot/>
  <DetailSidebar />
  <ResultNavigationBar />
  <ScheduleSidebar />
</template>

<script setup lang="ts">
import KakaoMapWrapper from '@/components/map/KakaoMapWrapper.vue'
import MapSearchBar from '@/components/map/MapSearchBar.vue'
import DetailSidebar from '@/components/map/DetailSidebar.vue'
import ResultNavigationBar from '@/components/map/ResultNavigationBar.vue'
import ScheduleSidebar from '@/components/map/ScheduleSidebar.vue'
import ChatBot from '@/components/map/ChatBot.vue'
const props = defineProps<{isNarrow: Boolean}> ()

</script>

<route lang="yaml">
meta:
  layout: MapLayout
</route>
