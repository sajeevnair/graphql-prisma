const jwt = require('jsonwebtoken');
const APP_SECRET = 'PRISMA-GRAPHQL-SERVER';

function getUserId(context) {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Barer ', '');
        const { userId } = jwt.verify(token, APP_SECRET);
        return userId;
    }
    throw new Error("not authorized");
}

module.exports = {
    getUserId,
    APP_SECRET
}
