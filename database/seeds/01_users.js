exports.seed = function(knex) {
    return knex('users').insert([
        {
            username: 'admin',
            password: "admin_pw",
        },
        {
            username: 'user',
            password: "user_pw",
        },
        {
            username: 'me',
            password: "me_pw",
        }
    ]);
};
