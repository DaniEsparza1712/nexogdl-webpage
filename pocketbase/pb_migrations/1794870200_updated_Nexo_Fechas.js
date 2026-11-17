/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3989146776")

  collection.listRule = "project.published = true"
  collection.viewRule = "project.published = true"

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3989146776")

  collection.listRule = null
  collection.viewRule = null

  return app.save(collection)
})
