<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <InquiryModal />
    <InquiryGlobalOverlay />
    <Toaster />
  </div>
</template>
<script setup>
import { Toaster, toast } from 'vue-sonner'
import 'vue-sonner/style.css'
</script>