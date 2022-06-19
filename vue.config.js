module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        extraResources: [
          {
            from: "./src/extra_resources/",
            to: "extra_resources",
            filter: [
              "**/*"
            ]
          }
        ]
      }
    }
  }
}