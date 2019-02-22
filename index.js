const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");
const cookieSession = require("cookie-session");
const bcrypt = require("./bcrypt");
const csurf = require("csurf");

app.use(require("body-parser").json());

app.use(
    cookieSession({
        secret: `Not today Hackers`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.static(__dirname + "/public"));

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

/////////////////////////////////////////////
const s3 = require("./s3");
const config = require("./config");

var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
///////////////////////////////////

app.post(
    "/profilePic/upload",
    uploader.single("uploadedFile"),
    s3.upload,
    (req, res) => {
        console.log("POST /upload");
        db.addImage(config.s3Url + req.file.filename, req.session.userId)
            .then(({ rows }) => {
                res.json({
                    imageurl: rows[0].imageurl
                });
            })
            .catch(err => console.log("error in profilePic uploader", err));
    }
);
////////////////////////////////////////////////
app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/welcome/register", (req, res) => {
    bcrypt
        .hash(req.body.password)
        .then(hashedPassword => {
            console.log("register- post-returned");
            return db.registerUser(
                req.body.first,
                req.body.last,
                req.body.email,
                hashedPassword,
                req.body.imageurl,
                req.body.bio
            );
        })
        .then(({ rows }) => {
            req.session.userId = rows[0].id;
            res.json({ success: true });
        })
        .catch(function(err) {
            console.log("register- Error is:", err);
            res.json({ success: false });
        });
});

app.post("/welcome/login", (req, res) => {
    db.getLoginInfo(req.body.email)
        .then(dbInfo => {
            req.session.userId = dbInfo.rows[0].id;

            if (dbInfo.rows[0].password) {
                return bcrypt.compare(
                    req.body.password,
                    dbInfo.rows[0].password
                );
            } else {
                res.json({ notRegistered: true });
            }
        })
        .then(() => {
            res.json({ success: true });
        })
        .catch(function(err) {
            console.log("login- Error is:", err);
            res.json({ success: false });
        });
});
///////////////////////

app.get("/user", (req, res) => {
    db.getUserInfo(req.session.userId)
        .then(dbInfo => {
            res.json(dbInfo);
        })
        .catch(err => {
            console.log("error in /user: ", err);
        });
});

/////////////////////
app.post("/updatebioo", (req, res) => {
    const bio = req.body.bioDraft;
    console.log("/updatebio userid hello:", req.session.userId);
    db.updateBio(bio, req.session.userId)
        .then(data => {
            res.json(data.rows[0].bio);
        })
        .catch(err => {
            console.log("error while updating bio: ", err);
            res.json({ error: true });
        });
});
//////////

app.get("/user/:id.json", (req, res) => {
    // console.log("index req.session.userid ", req.session.userId);
    // console.log("index req.params.id ", req.params.id);
    if (req.session.userId == req.params.id) {
        // console.log("index- same user");

        return res.json({ redirectTo: "/" });
    }
    db.getUserInfo(req.params.id)
        .then(data => {
            // console.log('data hjjhjkh:',data);
            res.json(data);
        })
        .catch(error => {
            console.log("error in getting /user/:id.json:", error);
        });
});

////////////////////friendship

app.get("/friendshipStatus/:id", (req, res) => {
    db.getFriendship(req.session.userId, req.params.id)
        .then(dbInfo => {
            // console.log("RESULTS sendFriendship", dbInfo);
            res.json(dbInfo);
        })
        .catch(err => {
            console.log("error in /user: ", err);
        });
});

app.post("/sendFriendship/:id", (req, res) => {
    // console.log(
    //     "index. js friendship:: req.session.userId:",
    //     req.session.userId
    // );
    // console.log("req.params.id:", req.params.id);
    db.sendFriendship(req.session.userId, req.params.id)
        .then(results => {
            // console.log("RESULTS sendFriendship", results);
            res.json(results);
        })
        .catch(err => {
            console.log("error while sendFriendship: ", err);
            res.json({ error: true });
        });
});
app.post("/acceptFriendship/:id", (req, res) => {
    db.acceptFriendship(req.session.userId, req.params.id)
        .then(results => {
            // console.log("RESULTS sendFriendship", results);
            res.json(results);
        })
        .catch(err => {
            console.log("error while acceptFriendship: ", err);
            res.json({ error: true });
        });
});

app.post("/removeFriendship/:id", (req, res) => {
    db.removeFriendship(req.session.userId, req.params.id)
        .then(results => {
            // console.log("RESULTS sendFriendship", results);
            res.json(results);
        })
        .catch(err => {
            console.log("error while removeFriendship: ", err);
            res.json({ error: true });
        });
});

app.get("/friends/list", (req, res) => {
    db.getFriendshipLists(req.session.userId)
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            console.log("error while getting friendshiplists: ", err);
        });
});

////////////////// friendship
//////////////////////////

///quests:
app.post("/addQuest", (req, res) => {
    // console.log("req.bdy", req.body);
    // console.log("addQuest");
    db.addQuest(
        req.body.board_name,
        req.body.board_img,
        req.body.description,
        req.body.type
    )
        .then(({ rows }) => {
            // console.log("rows[0].id :", rows[0].id);
            res.json({
                board_id: rows[0].id
            });
        })
        .catch(function(err) {
            console.log("addQuest- Error is:", err);
            res.json({ error: true });
        });
});

///

app.get("/getQuestInfo/:id", (req, res) => {
    const id = req.params.id;
    db.getQuestInfo(id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log("error in getting getQuestInfo", error);
        });
});

//////////

app.post(
    "/quest/upload",
    uploader.single("uploadedFile"),
    s3.upload,
    (req, res) => {
        console.log("quest /upload");
        db.addImageInQuest(
            req.body.boardId,
            req.session.userId,
            config.s3Url + req.file.filename,
            req.body.description,
            req.body.location
        )
            .then(data => {
                // res.json(rows[0]);
                res.json(data.rows[0].imageurl);
            })
            .catch(err => console.log("error in quest uploader", err));
    }
);

/////

app.get("/getMyQuests", (req, res) => {
    db.getMyQuests(req.session.userId)
        .then(data => {
            res.json(data);
            // console.log("data", data);
        })
        .catch(error => {
            console.log("error in getting getMyQuests", error);
        });
});
///////////////

app.get("/getQuestImages/:id", (req, res) => {
    const id = req.params.id;
    db.getQuestImages(id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log("error in getting getQuestImages", error);
        });
});
//////

app.get("/getImageInfo/:id", (req, res) => {
    const id = req.params.id;
    db.getImageInfo(id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log("error in getting getImageInfo", error);
        });
});

app.get("/getUploaderName/:id", (req, res) => {
    console.log("!!req.params.id", req.params.id);
    const id = req.params.id;
    db.getUploaderName(id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log("error in getting getImageInfo", error);
        });
});

///////

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

////////--Always keep at the end
app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
///////////////////

app.listen(3000, function() {
    console.log("I'm listening.");
});
