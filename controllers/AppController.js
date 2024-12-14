import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  /**
   * Function should return if Redis is alive and if the DB 
   * is alive too by using the 2 utils created previously:
   * { "redis": true, "db": true } status code 200
   */
  static getStatus(request, response) {
    response.status(200).json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
  }

  /**
   * Function should return the number of users and files 
   * in DB { "users": 12, "files": 1231 }
   * status code 200
   */
  static async getStats(request, response) {
    const usersNu = await dbClient.nbUsers();
    const filesNu= await dbClient.nbFiles();
    response.status(200).json({ users: usersNu, files: filesNu });
  }
}

module.exports = AppController;
