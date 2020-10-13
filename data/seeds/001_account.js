// bcrypt 8 rounds

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('account').insert([
    {
      email: 'llama001@maildrop.cc',
      username: 'user1',
      // pin = 1111
      hashed_pin:
        '$2y$12$V2AptpsFuvWaxt5yVoH/F.RtdzuecAJUQz4Y1oa.3wcGEkgjgvndO',
    },
    {
      email: 'llama002@maildrop.cc',
      username: 'user2',
      // pin = 1111
      hashed_pin:
        '$$2y$12$V2AptpsFuvWaxt5yVoH/F.RtdzuecAJUQz4Y1oa.3wcGEkgjgvndO',
    },
    {
      email: 'llama003@maildrop.cc',
      username: 'user3',
      // pin = 1111
      hashed_pin:
        '$2y$12$V2AptpsFuvWaxt5yVoH/F.RtdzuecAJUQz4Y1oa.3wcGEkgjgvndO',
    },
    {
      email: 'llama004@maildrop.cc',
      username: 'user4',
      // pin = 1111
      hashed_pin:
        '$2y$12$V2AptpsFuvWaxt5yVoH/F.RtdzuecAJUQz4Y1oa.3wcGEkgjgvndO',
    },
  ]);
};
