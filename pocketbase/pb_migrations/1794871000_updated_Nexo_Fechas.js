/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3989146776")

  // Public project pages expand this relation. View stays open; listing stays admin-only.
  collection.viewRule = ""

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3989146776")

  collection.viewRule = null

  return app.save(collection)
})
