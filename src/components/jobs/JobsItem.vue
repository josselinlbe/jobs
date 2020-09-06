<template>
  <div>
    <v-list-item
      :disabled="doc._deleted"
      three-line
      @click="openLink(doc.link)"
    >
      <v-list-item-content>
        <v-list-item-title
          class="title"
          v-text="doc.company + ' - ' + doc.title"
        />
        <v-list-item-subtitle
          v-text="doc.function"
        />
      </v-list-item-content>
      <v-list-item-action>
        <v-list-item-subtitle
          v-text="doc.query"
        />
        <v-list-item-action-text v-text="doc.date" />
        <v-list-item-subtitle
          v-text="doc.place"
        />
      </v-list-item-action>
    </v-list-item>
    <v-divider />
  </div>
</template>

<script>
export default {
  name: "JobsItems",
  props: {
    doc: {
      type: Object,
      default: () => {},
    }
  },
  methods: {
    openLink(url) {
      window.open(url, "_blank");
    }
  }
};
</script>
