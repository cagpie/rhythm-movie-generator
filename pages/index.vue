<template>
  <div class='w-full border'>
    <div class="flex">
      <div>
        <ClientOnly>
          <preview />
        </ClientOnly>
      </div>
      <div class="ml-2">
        <settings />
        <file-loader
          class="mt-2"
        />
        <parts-list
          class="mt-2"
        />
      </div>
    </div>
    <div class="mt-2 grid grid-cols-2">
      <div>
        <logs />
      </div>
      <div>
        <ClientOnly>
          <renderer />
        </ClientOnly>
      </div>
    </div>
    {{ parts }}
  </div>
</template>

<script setup lang="js">
</script>
