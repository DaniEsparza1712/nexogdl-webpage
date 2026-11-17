/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_640422059")

  // add field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1945166249",
    "help": "",
    "hidden": false,
    "id": "relation395330898",
    "maxSelect": 10,
    "minSelect": 0,
    "name": "leads",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_640422059")

  // remove field
  collection.fields.removeById("relation395330898")

  return app.save(collection)
})
