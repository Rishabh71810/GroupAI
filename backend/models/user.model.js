import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [5, 'Email must be at least 5 characters.'],
        maxlength: [50, 'Email cannot exceed 50 characters.'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
});

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Skip if password is not modified
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJWT = function () {
    // Debug log for this object
   
    if (!this.email) {
        throw new Error('Email is required for token generation');
    }

    const payload = {
        email: this.email,
        id: this._id
    };
    
    // Debug log for payload
    console.log('JWT Payload:', payload);
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
    
    // Debug log for generated token
    console.log('Generated token:', token);
    
    return token;
};

const User = mongoose.model("User", userSchema);

export default User;
