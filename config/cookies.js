const cookieOptions = {
    httpOnly: true,
    secure: true || process.env,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/'
}

const clearCookieOptions = {
    httpOnly: true,
    secure: true || process.env,
    sameSite: 'none',
    path: '/'
}

module.exports = {cookieOptions, clearCookieOptions};