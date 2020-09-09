<template>
  <v-main>
    <v-container fluid>
      <v-skeleton-loader
        :loading="this.$store.getters.loaderState"
        transition="scroll-y-reverse-transition"
        type="list-item-avatar-two-line"
      >
        <v-data-iterator
          ref="rafflesDataIterator"
          :items="jobsList"
          item-key="_id"
          :items-per-page="50"
          :search="search"
          :sort-by="sortByFormatted"
          :loading="this.$store.getters.loaderState"
          loading-text="Getting Jobs"
          no-data-text="No jobs matching request"
        >
          <template v-slot:header>
            <v-toolbar
              class="mb-1"
              dark
              color="primary darken-1"
              elevation="1"
            >
              <v-text-field
                v-model="search"
                clearable
                hide-details
                solo-inverted
                flat
                prepend-inner-icon="mdi-magnify"
                label="Filter title job"
              />
              <v-spacer />
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-sort-variant"
                label="Sort by"
              />
              <v-spacer />
            </v-toolbar>
          </template>
          <template v-slot:default="props">
            <v-container fluid>
              <v-row dense>
                <v-card
                  class="ma-5"
                  outlined
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline mb-1">
                        {{ countFullTime }}
                      </v-list-item-title>
                      <v-list-item-subtitle>Full time</v-list-item-subtitle>
                      <v-list-item-subtitle>Last extract: {{ dateFullTime | date }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
                <v-card
                  class="ma-5"
                  outlined
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline mb-1">
                        {{ countIntern }}
                      </v-list-item-title>
                      <v-list-item-subtitle>Intern</v-list-item-subtitle>
                      <v-list-item-subtitle>Last extract: {{ dateIntern | date }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-row>
            </v-container>
            <v-list two-line>
              <JobsItem
                v-for="doc in props.items"
                :key="doc._id"
                :doc="doc"
              />
            </v-list>
          </template>
        </v-data-iterator>
      </v-skeleton-loader>
    </v-container>
  </v-main>
</template>

<script>
import JobsItem from "@/components/jobs/JobsItem.vue";
import LinkedinFullTime from "../../public/linkedin_fulltime_output.json"
import LinkedinIntern from "../../public/linkedin_intern_output.json"

export default {
  name: "Jobs",
  components: {
    JobsItem
  },
  filters: {
      date: function(str) {
          if (!str) { return '(n/a)'; }
          str = new Date(str);
          return str.getFullYear() + '-' + ((str.getMonth() < 9) ? '0' : '') + (str.getMonth() + 1) + '-' +
              ((str.getDate() < 10) ? '0' : '') + str.getDate();
      }
  },
  data: () => ({
    countFullTime: LinkedinFullTime.data.length,
    countIntern: 0,
    dateFullTime: LinkedinFullTime.time,
    dateIntern: LinkedinIntern.time,
    drawer: false,
    search: "",
    sortBy: "Full title",
    keys: ["Full title"],
    navTabs: [
      {
        name: "All",
        to: "jobs",
        params: { list: "all" },
        icon: "mdi-all-inclusive"
      }
    ],
  }),
  computed: {
    jobsList() {
      let data = this.$store.getters.getData;

      let f = this.filterByTag;
      if (f) {
        data = data.filter(function(raffle) {
          return raffle.keywords.includes(f)
        })
      }
      return data
    },
    sortByFormatted() {
      const x = this.sortBy.toLowerCase().split(" ");
      const secondLeg = x[1].charAt(0).toUpperCase() + x[1].slice(1);
      return x[0] + secondLeg;
    }
  },
  mounted() {
    this.getJobs()
    this.$store.commit("appBarTabs", this.navTabs);
  },
  beforeDestroy() {
    this.$store.commit("appBarTabs", []);
  },
  methods: {
     getJobs: function() {
      try {
        this.$store.commit("addDataArray", LinkedinFullTime.data);
        // this.$store.commit("addDataArray", LinkedinIntern.data);
      } catch (error) {
        this.$store.dispatch("infoBridge", {
          color: "error",
          text: "Unable to get jobs",
          error: error
        });
      }
    },
  }
};
</script>
