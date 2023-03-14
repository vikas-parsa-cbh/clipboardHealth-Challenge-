const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");
const { MAX_PARTITION_KEY_LENGTH, TRIVIAL_PARTITION_KEY } = require("./config");
describe("deterministicPartitionKey", () => {
  it("should returns the default value when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
  });
  it("should return the hash of the input object when no partition key is provided", () => {
    const event = { pk: "mock-pk-data", sk: "mock-sk-data" };
    const expectedPartitionKey = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");
    expect(deterministicPartitionKey(event)).toBe(expectedPartitionKey);
  });
  it("should return the input partition key when provided if it does not exceeds the maximum length", () => {
    const event = { partitionKey: "mock-partition-key" };
    expect(deterministicPartitionKey(event)).toBe("mock-partition-key");
  });
  it("should return stringify non-string inputs before hashing", () => {
    const event = {
      partitionKey: {
        pk: "mock-pk-data",
      },
    };
    const expectedPartitionKey = JSON.stringify(event.partitionKey);
    expect(deterministicPartitionKey(event)).toBe(expectedPartitionKey);
  });
  it("should return hash the partition key if it exceeds the maximum length", () => {
    const longPartitionKey = "x".repeat(MAX_PARTITION_KEY_LENGTH + 1);
    const expectedPartitionKey = crypto
      .createHash("sha3-512")
      .update(longPartitionKey)
      .digest("hex");
    expect(deterministicPartitionKey({ partitionKey: longPartitionKey })).toBe(
      expectedPartitionKey
    );
  });
});