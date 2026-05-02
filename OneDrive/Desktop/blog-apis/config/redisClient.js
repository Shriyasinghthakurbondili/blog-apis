const { createClient } = require("redis");

// ✅ Get Redis URL safely
const getRedisUrl = () => {
  const raw = (process.env.REDIS_URL || "").trim();
  if (!raw) return "";

  // Handle case like: "redis-cli -u redis://..."
  if (raw.includes("redis-cli") && raw.includes("-u")) {
    const extracted = raw.split("-u")[1];
    return extracted ? extracted.trim() : "";
  }

  return raw;
};

const redisUrl = getRedisUrl();

let redisClient = null;

// ✅ Create client safely
if (redisUrl) {
  try {
    redisClient = createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: false, // prevent infinite retries
      },
    });

    // Handle runtime errors
    redisClient.on("error", (error) => {
      console.error("Redis error:", error.message);
    });
  } catch (err) {
    console.log("Skipping Redis setup due to error");
  }
}

// ✅ Connect function
const connectRedis = async () => {
  if (!redisClient) {
    console.log("Redis not configured. Skipping...");
    return;
  }

  try {
    await redisClient.connect();
    console.log("Redis connected ✅");
  } catch (error) {
    console.log("Redis failed, continuing without it...");
    try {
      if (redisClient.isOpen) {
        await redisClient.quit();
      }
    } catch (e) {
      console.log("Redis cleanup skipped");
    }
  }
};

module.exports = { redisClient, connectRedis };