/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3989146776")

  // update collection data
  unmarshal({
    "listRule": null,
    "viewRule": null
  }, collection)

  // remove field
  collection.fields.removeById("relation800313582")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3989146776")

  // update collection data
  unmarshal({
    "listRule": "project.published = true",
    "viewRule": "project.published = true"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_640422059",
    "help": "",
    "hidden": false,
    "id": "relation800313582",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "project",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
