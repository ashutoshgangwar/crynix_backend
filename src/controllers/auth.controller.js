const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body; // ID token from frontend

    if (!tokenId) {
      return res.status(400).json({ message: 'ID token is required' });
    }

    // 1️⃣ Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    // 2️⃣ Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name,
        avatar: picture,
        googleId,
        isVerified: true,
      });
    } else {
      // Update user info if re-login
      user.name = name;
      user.avatar = picture;
      user.googleId = googleId;
    }

    // 3️⃣ Generate your own JWT for API auth
    const accessToken = jwt.sign(
      { userId: user._id, email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 4️⃣ Save JWT in user document
    user.accessToken = accessToken;
    await user.save();

    // 5️⃣ Respond with user info + accessToken
    res.json({
      accessToken,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Google login failed' });
  }
};
