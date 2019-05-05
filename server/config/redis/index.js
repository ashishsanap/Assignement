import redis from 'redis';

const redisClient = redis.createClient(process.env.REDISCLOUD_URL, { no_ready_check: true });

redisClient.on('ready', () => {
    redisClient.set('aaa', 'aaa');
  console.log('start redis');
});

redisClient.on('error', (error) => {
  console.log('Error in Redis', error);
});


module.exports = { redisClient };
