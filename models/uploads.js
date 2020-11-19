module.exports = (sequelize, type) => {
    return sequelize.define('upload', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customerId: type.INTEGER,
        layoutId: type.INTEGER,
        name: type.STRING,
        filePath: type.STRING
    });
}
