<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      dark
      width="250"
      color="primary darken-4"
    >
      <v-img
        :aspect-ratio="16/9"
        src="@/assets/logo.gif"
      >
        <v-row
          align="end"
          class="pa-2 fill-height"
        >
          <v-col>
            <div class="subheading">
              Veille
            </div>
            <div class="body-1">
              Find jobs
            </div>
          </v-col>
        </v-row>
      </v-img>
      <v-list
        dense
        flat
      />
      <NavbarApps />
      <v-divider />
      <v-list-item
        link
        href="https://github.com/josselinlbe/jobs"
        target="_blank"
        rel="noreferrer"
      >
        <v-list-item-icon>
          <v-icon>mdi-help</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Contribute</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-open-in-new</v-icon>
        </v-list-item-action>
      </v-list-item>
      <v-list-item
        link
        href="https://www.linkedin.com/in/josselinliebe/"
        target="_blank"
        rel="noreferrer"
      >
        <v-list-item-icon>
          <v-icon>mdi-book-information-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-open-in-new</v-icon>
        </v-list-item-action>
      </v-list-item>
      <template
        v-slot:append
      >
        <v-list shaped>
          <v-list-item
            link="link"
            to="/settings"
          >
            <v-list-item-action>
              <v-icon>mdi-cogs</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="primary darken-2"
      dark
      hide-on-scroll
      elevate-on-scroll
    >
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        top
        color="info"
        height="4"
      />
      <v-app-bar-nav-icon
        aria-label="Apps menu"
        @click.stop="drawer = !drawer"
      />
      <v-spacer />
      <template v-slot:extension>
        <v-tabs
          align-with-title
          show-arrows
          active-class="primary darken-1 text--white"
        >
          <v-tab
            v-for="(tab, i) in $store.getters.appBarTabs"
            :key="i"
            :to="{ name: tab.to, params: tab.params }"
          >
            {{ tab.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-scroll-y-transition mode="out-in">
      <router-view />
    </v-scroll-y-transition>
    <v-snackbar
      v-model="snackbar.visible"
      :timeout="snackbar.timeout"
      :multi-line="snackbar.multiline === true"
      :color="snackbar.color"
      app
      :top="$vuetify.breakpoint.mdAndDown"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<script>
import NavbarApps from "@/components/app/NavbarApps.vue";

export default {
  name: "App",
  components: {
    NavbarApps
  },
  computed: {
    drawer: {
      get() {
        return this.$store.getters.isLeftDrawerOpen;
      },
      set(state) {
        this.$store.commit("setLeftDrawer", state);
      }
    },
    snackbar() {
      return this.$store.state.snackbar;
    },
    loading() {
      return this.$store.getters.loaderState;
    }
  },
  mounted() {
    this.$store.dispatch("infoBridge", {
      text: "Job mounted",
      level: "debug"
    });
    this.$store.commit("loadLocalSettings");
    this.$vuetify.theme.dark = localStorage.getItem("darkMode");
    setTimeout(() => {
      this.$store.commit("setGenericStateBooleanFalse", "buttonFormNewHidden");
    }, 1000);
    setTimeout(() => {
      if (this.$vuetify.breakpoint.lgAndUp) {
        this.drawer = true;
      }
    }, 2000);
  }
};
</script>
