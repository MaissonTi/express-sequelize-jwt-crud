import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        ds_address: Sequelize.STRING,
        city: Sequelize.STRING,
        zip_code: Sequelize.STRING,
        country: Sequelize.STRING,
        state: Sequelize.STRING,
        number: Sequelize.NUMBER,
        is_main: Sequelize.BOOLEAN,
        ds_address_full: {
          type: Sequelize.VIRTUAL,
          ger() {
            return `${this.ds_address} Nº${this.number}, ${this.city}, ${this.state} - CEP ${this.zip_code}, ${this.state}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Address;
