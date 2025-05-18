const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;