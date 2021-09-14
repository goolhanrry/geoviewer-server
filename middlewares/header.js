/* Written by Ye Liu */

export default async (ctx, next) => {
    // Set request headers
    ctx.request.header['content-type'] = 'application/json;charset=utf-8';

    // Set response headers
    ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set('Access-Control-Allow-Methods', 'GET, POST');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    ctx.set('Content-Type', 'application/json;charset=utf-8');

    // Call next middleware
    await next();

    // Force to use secure cookie
    if (ctx.response.headers['set-cookie']) {
        const header = [];
        ctx.response.headers['set-cookie'].map(item => {
            header.push(item + '; secure');
        })
        ctx.set('Set-Cookie', header);
    }
};
