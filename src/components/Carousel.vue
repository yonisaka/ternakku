<template>
<v-card
    elevation="12"
    class="mx-auto"
  >
    <v-carousel
    cycle
    height="auto"
    hide-delimiter-background
    show-arrows-on-hover
    class="shadow-md"
    delimiter-icon="mdi-minus"
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
    <v-img :src=slide
    aspect-ratio="2.5"
    ></v-img>
    </v-carousel-item>
  </v-carousel>
  
  </v-card>
    
</template>




<script>
  export default {
    data: () => ({
      model: 0,
      colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'https://api.caltymart.com/carousel/cr1.jpeg',
          'https://api.caltymart.com/carousel/cr2.jpeg',
          'https://api.caltymart.com/carousel/cr3.jpeg',
          'https://api.caltymart.com/carousel/cr4.jpeg',
          'https://api.caltymart.com/carousel/cr5.jpeg',
        ],
    }),
  }
</script>