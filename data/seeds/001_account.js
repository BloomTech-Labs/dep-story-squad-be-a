// bcrypt 8 rounds


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('account').del()
    .then(function () {
      // Inserts seed entries
      return knex('account').insert([
        {
          email: 'llama001@maildrop.cc',
          username: 'user1',
          // pin = 1111
          hashed_pin: '$2y$08$dV0R6xm/FMXsCfr0inVQA.qzZhkZzrFSBC9zwpzFKsNN1kNP8Dz6C'
        },
        {
          email: 'llama002@maildrop.cc',
          username: 'user2',
          // pin = 1111
          hashed_pin: '$2y$08$dV0R6xm/FMXsCfr0inVQA.qzZhkZzrFSBC9zwpzFKsNN1kNP8Dz6C'
        },
        {
          email: 'llama003@maildrop.cc',
          username: 'user3',
          // pin = 1111
          hashed_pin: '$2y$08$dV0R6xm/FMXsCfr0inVQA.qzZhkZzrFSBC9zwpzFKsNN1kNP8Dz6C'
        },
        {
          email: 'llama004@maildrop.cc',
          username: 'user4',
          // pin = 1111
          hashed_pin: '$2y$08$dV0R6xm/FMXsCfr0inVQA.qzZhkZzrFSBC9zwpzFKsNN1kNP8Dz6C'
        },
        
      ]);
    });
};
