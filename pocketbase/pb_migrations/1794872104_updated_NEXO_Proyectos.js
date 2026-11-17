/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_640422059")

  // add field
  collection.fields.addAt(10, new Field({
    "exceptDomains": [],
    "help": "",
    "hidden": false,
    "id": "url266631402",
    "name": "joinurl",
    "onlyDomains": [],
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_640422059")

  // remove field
  collection.fields.removeById("url266631402")

  return app.save(collection)
})
