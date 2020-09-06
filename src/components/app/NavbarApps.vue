<template>
  <v-list>
    <v-list-item
      v-for="link in apps"
      :key="link.name"
      link
      :to="{ name: link.to, params: link.params }"
      active-class="secondary"
    >
      <v-list-item-icon>
        <v-icon v-text="link.icon" />
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title
          style="text-transform: capitalize;"
          v-text="link.name"
        />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "NavbarApps",
  data: () => ({
    apps: [{
      name: "Jobs",
      icon: "mdi-home",
      to: "jobs"
    }]
  })
};
</script>
