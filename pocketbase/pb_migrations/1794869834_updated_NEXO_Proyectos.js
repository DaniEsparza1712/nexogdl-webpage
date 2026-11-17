/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_640422059")

  // add field
  collection.fields.addAt(9, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3989146776",
    "help": "",
    "hidden": false,
    "id": "relation2876557598",
    "maxSelect": 10,
    "minSelect": 0,
    "name": "dates",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_640422059")

  // remove field
  collection.fields.removeById("relation2876557598")

  return app.save(collection)
})
