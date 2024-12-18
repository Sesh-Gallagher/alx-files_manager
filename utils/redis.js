import { createClient } from 'redis';
import { promisify } from 'util';

/**
* Creates a new RedisClient instance.
   */
class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to server: ${error}`);
    });
  }

  /**
   * Checks if this client's connection to the Redis server is active.
   */
  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  /**
   * Retrieves the value of a given key.
   */
  async get(key) {
    const redisGet = promisify(this.client.get).bind(this.client);
    const value = await redisGet(key);
    return value;
  }

  /**
   * Stores a key and its value along with an expiration time.
   */
  async set(key, value, time) {
    const redisSet = promisify(this.client.set).bind(this.client);
    await redisSet(key, value);
    await this.client.expire(key, time);
  }

  /**
   * Removes the value of a given key.
   */
  async del(key) {
    const redisDel = promisify(this.client.del).bind(this.client);
    await redisDel(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
