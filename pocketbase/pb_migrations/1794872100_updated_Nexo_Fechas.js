/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3989146776")

  // Presentable name is only for the admin UI. Public pages still need to expand dates.
  collection.viewRule = ""

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3989146776")

  collection.viewRule = null

  return app.save(collection)
})
