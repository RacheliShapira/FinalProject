const spicedPg = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg(`postgres:webuser:webuser@localhost:5432/quest`);
}

module.exports.registerUser = function(
    first,
    last,
    email,
    hashedPassword,
    imageurl,
    bio
) {
    return db.query(
        `INSERT INTO users (first, last, email, password, imageurl, bio)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [first, last, email, hashedPassword, imageurl, bio]
    );
};

module.exports.getLoginInfo = function(email) {
    return db.query(
        `SELECT *
        FROM users
        WHERE email = $1`,
        [email]
    );
};

module.exports.getUserInfo = function(id) {
    return db.query(
        `SELECT *
        FROM users
        WHERE id = $1`,
        [id]
    );
};

module.exports.addImage = function(imageurl, id) {
    return db.query(
        `UPDATE users
        SET imageurl = $1
        WHERE id = $2
        RETURNING imageurl`,
        [imageurl, id]
    );
};

module.exports.updateBio = function(bio, id) {
    return db.query(
        `UPDATE users
        SET bio = $1
        WHERE id = $2
        RETURNING bio`,
        [bio, id]
    );
};

exports.getFriendship = (loggedInId, otherUserId) => {
    return db.query(
        `SELECT * FROM friendship
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)`,
        [loggedInId, otherUserId]
    );
};
/////friendship

module.exports.sendFriendship = (loggedInId, otherUserId) => {
    return db.query(
        `INSERT INTO friendship (sender_id, recipient_id)
        VALUES ($1, $2) returning *`,
        [loggedInId, otherUserId]
    );
};
module.exports.acceptFriendship = (loggedInId, otherUserId) => {
    return db.query(
        `UPDATE friendship
        SET accepted = true
         WHERE (recipient_id = $1 AND sender_id= $2)`,
        [loggedInId, otherUserId]
    );
};
module.exports.removeFriendship = (loggedInId, otherUserId) => {
    return db.query(
        `DELETE FROM friendship
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)`,
        [loggedInId, otherUserId]
    );
};

/////friendship
