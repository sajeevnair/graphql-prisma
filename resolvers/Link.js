const postedBy = (root, args, context, info) => context.prisma.link({ id: root.id }).postedBy();
module.exports = {
    postedBy
}