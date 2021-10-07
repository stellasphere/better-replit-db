const fetch = require("node-fetch");

beforeAll(async () => {
  client = require("../../index");
  await client.empty();
});

afterEach(async () => {
  await client.empty();
});

test("makes a second client with the URL, set a value, and delete it", async () => {
	let db2 = client.connect(process.env.REPLIT_DB_URL);
	expect(db2)
	.toBeTruthy();
	expect(await db2.set('key', 'value')).toEqual(db2);
	expect(await db2.get('key')).toEqual('value');
});

test("create a client with a key 1 times", async () => {
	for (let i = 0; i < 1; i++) {
		expect(client).toBeTruthy();
		expect(typeof client.url).toBe("string");
	}
});

test("sets a value 1 times", async () => {
	for (let i = 0; i < 1; i++) {
		expect(await client.set("key", "value")).toEqual(client);
		expect(await client.setAll({ key: "value", second: "secondThing" })).toEqual(
			client
		);
	}
});

test("list keys 1 times", async () => {
	for (let i = 0; i < 1; i++) {
		await client.setAll({
			key: "value",
			second: "secondThing",
		});

		expect(await client.list()).toEqual(["key", "second"]);
	}
});

test("gets a value 1 times", async () => {
	for (let i = 0; i < 1; i++) {
		await client.setAll({
			key: "value",
		});

		expect(await client.getAll()).toEqual({ key: "value" });
	}
});

test("delete a value 1 times", async () => {
	for (let i = 0; i < 1; i++) {
		await client.setAll({
			key: "value",
			deleteThis: "please",
			somethingElse: "in delete multiple",
			andAnother: "again same thing",
		});

		expect(await client.delete("deleteThis")).toEqual(client);
		expect(await client.deleteMultiple("somethingElse", "andAnother")).toEqual(
			client
		);
		expect(await client.list()).toEqual(["key"]);
		expect(await client.empty()).toEqual(client);
		expect(await client.list()).toEqual([]);
	}
});

test("list keys with newline", async () => {
	for (let i = 0; i < 1; i++) {
		await client.setAll({
			"key\nwit": "first",
			keywidout: "second",
		});

		expect(await client.list()).toEqual(["key\nwit", "keywidout"]);
	}
});

test("ensure that we escape values when setting", async () => {
	for (let i = 0; i < 1; i++) {
		expect(await client.set("a", "1;b=2")).toEqual(client);
		expect(await client.list()).toEqual(["a"])
		expect(await client.get("a")).toEqual("1;b=2")
	}
});