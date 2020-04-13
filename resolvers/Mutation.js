const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

const signup = async (root, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.createUser({ ...args, password });
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return { user, token };
}

const login = async (root, args, context, info) => {
    const user = await context.prisma.user({ email: args.email });
    if (!user) {
        throw new Error("No such user found!");
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
        throw new Error("Password is invalid");
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        user,
        token
    };

}

const post = (root, args, context, info) => {
    const userId = getUserId(context);
    return context.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: {connect: {id: userId}},
    });
}

module.exports = {
    signup,
    login,
    post
}