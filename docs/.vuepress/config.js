module.exports = {
  title: "Mob's Blog",
  description: "Mob WEB Javascript Vue.js",
  repo: "https://github.com/guapi233/guapi233.github.io.git",
  repoLabel: "github",
  head: [
    ['link', { rel: 'icon', href: '/img/head3.png' }]
  ],
  themeConfig: {
    nav: require("./pageconf/nav"),
    nextLinks: true,
    prevLinks: true,
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    smoothScroll: true,
    sidebar: require("./pageconf/sidebar")
  }
}