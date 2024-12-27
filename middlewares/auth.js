const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    // Check for token in cookies or Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized: No token provided',
            code: 'NO_TOKEN',
        });
    }

    try {
        // Verify the token
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user data to the request object
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        console.error('JWT verification error:', err.message); // Log the error
        return res.status(401).json({
            message: 'Invalid or expired token',
            code: 'INVALID_TOKEN',
        });
    }
}

module.exports = auth;
