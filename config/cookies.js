const cookieOptions = {
    httpOnly: true,
    secure: false || process.env,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/'
}

const clearCookieOptions = {
    httpOnly: true,
    secure: false || process.env,
    sameSite: 'strict',
    path: '/'
}

module.exports = {cookieOptions, clearCookieOptions};