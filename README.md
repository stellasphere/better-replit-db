[![npm version](https://badge.fury.io/js/better-replit-db.svg)](https://badge.fury.io/js/better-replit-db)

[![Run on Replit](https://replit.com/badge/github/pieromqwerty/better-replit-db)](https://replit.com/github/pieromqwerty/better-replit-db)

# Better Replit DB
Better Replit DB is a fork of the official Replit Database client, with the added benefit of the contents being cached in memory. This allows for much faster load read and write times than the regular client. It also uses `await/async`, just like the official client.

## Moving from `@replit/database` to `better-replit-db`
Moving from `@replit/database` to `better-replit-db` is really easy. Simply replace these lines:
```js
const Database = require("@replit/database");
const db = new Database();
```
with this:
```js
const db = require("better-replit-db");
```

***IT IS LITERALLY DOZENS OF TIMES FASTER THAN THE OFFICIAL LIB***

## Speed Comparison
### 20x Ops
|Test|better-replit-database|@replit/database|Times Faser
-|-|-|-
Creating a Client|**16 ms**</span>|120 ms|**7.5x**
Setting a Value|**80 ms**|2858 ms|**35.7x**
Listing Keys|**107 ms**|1583 ms|**14.8x**
Getting a Value|**25 ms**|1349 ms|**54.0x**
Deleting a Value|**199 ms**|4046 ms|**20.3x**
Listing Keys|**36 ms**|1422 ms|**39.5x**
Ensuring Values are Escaped|**35 ms**|1350ms|**38.6x**

### 100x Ops
> Coming Soon - Regular DB Host Gets Ratelimited

## Get started
```js
const db = require("better-replit-db");

db.set("key", "value").then(async () => {
	let key = await db.get("key");
	console.log(key);
});
```

## Docs
### `class Client(String key?)`
The key is the optional custom URL.

- `db.connect(String key)`
  Returns another db object, but connects with the provided key.
  ```js
  db.get("key").then(console.log);
  ```

**Native Functions**

These functions are specified in the replit DB.

- `get(String key, Object options?)`

  Gets a key. Returns Promise.
  ```js
  db.get("key").then(console.log);
  ```
  Or if you want to store raw data:
  ```js
  db.get("key", { raw: true }).then(console.log);
  ```

- `set(String key, Any value)`
  
  Sets a key to value. Returns Client. 
  ```js
  db.set("key", "value");
  ```
  Or if you want to set raw data:
  ```js
  db.set("key", "value", { raw: true });
  ```

- `delete(String key)`

  Deletes a key. Returns Client.
  ```js
  db.delete("key");
  ```

- `list(String? prefix)`

  Lists all of the keys.
  ```js
  db.list();
  ```
  Or if you want all of the keys starting with `prefix`.
  ```js
  db.list("prefix");
  ```


**Dynamic Functions**

These functions have been added by the original author.

- `empty()`

  Clears the database. Returns Client
  ```js
  db.empty();
  ```

- `getAll()`
  
  Get all key/value pairs and return as an object.
  ```js
  db.getAll();
  ```

- `setAll(Object obj)`

  Sets the entire database through a key/value object. Returns Client
  ```js
  db.setAll({key1: 'value1', key2: 'value2'});
  ```

- `deleteMultiple(...String args)`

  Deletes multiple keys. Returns client.
  ```js
  db.delete("key1", "key2", "key3");
  ```

## Tests
```sh
npm i
npm run test
```

## License
This software is under the MIT license