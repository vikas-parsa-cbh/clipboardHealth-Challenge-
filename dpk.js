const crypto = require("crypto");
const { MAX_PARTITION_KEY_LENGTH, TRIVIAL_PARTITION_KEY } = require("./config");
exports.deterministicPartitionKey = (event) => {
  // If no event is provided, return the trivial partition key
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }
  // If no partition key is provided, return the hash of the event (stringified)
  if (!event.partitionKey) {
    return crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");
  }
  // If the partition key is not a string, stringify it
  const partitionKey =
    typeof event.partitionKey === "string"
      ? event.partitionKey
      : JSON.stringify(event.partitionKey);
  // If the partition key is less than the maximum length, return it
  if (partitionKey.length < MAX_PARTITION_KEY_LENGTH) {
    return partitionKey;
  }
  // Otherwise, return the hash of the partition key
  return crypto.createHash("sha3-512").update(partitionKey).digest("hex");
};