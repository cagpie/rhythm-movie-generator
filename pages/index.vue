<template>
  <div class='w-full max-w-[150vh] mx-auto p-2'>
    <div class="flex flex-wrap">
      <h1 class="text-2xl md:text-4xl font-bold">Rhythm Movie Generator β</h1>
      <div class="flex md:ml-4">
        <project-init />
        <project-load />
        <project-save />
      </div>
      <div class="flex md:ml-4">
        <demos />
      </div>
    </div>
    <div class="mt-2 block md:flex">
      <div class="md:w-[70%]">
        <div class="h-full">
          <div class="sticky top-0">
            <ClientOnly>
              <preview />
            </ClientOnly>
            <div class="mt-2 grid md:grid-cols-3 gap-2">
              <ClientOnly>
                <renderer />
              </ClientOnly>
              <settings/>
              <logs />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-2 md:mt-0 md:ml-2 md:w-[30%]">
        <parts-summary />
        <parts-list
          class="mt-2"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
</script>
