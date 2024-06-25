<template>
  <div class='w-full max-w-[150vh] mx-auto p-2'>
    <div class="flex">
      <h1 class="text-4xl font-bold">Rhythm Movie Generator β</h1>
      <div class="flex ml-4">
        <project-init />
        <project-load />
        <project-save />
      </div>
      <div class="flex ml-4">
        <demos />
      </div>
    </div>
    <div class="flex">
      <div class="w-[70%]">
        <div class="h-full">
          <div class="sticky top-0">
            <ClientOnly>
              <preview />
            </ClientOnly>
            <div class="mt-2 grid grid-cols-3 gap-2">
              <ClientOnly>
                <renderer />
              </ClientOnly>
              <settings/>
              <logs />
            </div>
          </div>
        </div>
      </div>
      <div class="ml-2 w-[30%]">
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
