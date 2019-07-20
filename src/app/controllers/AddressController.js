import Address from '../models/Address';
import AddressValidation from '../validations/AddressValidation';
import User from '../models/User';

class AddressController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const address = await Address.findAll({
      where: { user_id: req.userId },
      order: ['ds_address'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: { exclude: ['created_at', 'updated_at', 'user_id'] },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(address);
  }

  async store(req, res) {
    // Validation of fields
    if (await AddressValidation.isValidStore(req)) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    req.body.user_id = req.userId;

    const address = await Address.create(req.body);

    return res.json(address);
  }

  async delete(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ error: 'id not found' });
    }

    const address = await Address.findByPk(req.params.id);

    if (!address) {
      return res.status(400).json({ error: 'not found address' });
    }

    await address.destroy();

    return res.status(200).json({
      sucess: 'item deleted with success',
    });
  }

  async update(req, res) {
    // Validation of fields
    if (await AddressValidation.isValidUpdate(req)) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (!req.params.id) {
      return res.status(400).json({ error: 'id not found' });
    }

    const address = await Address.findByPk(req.params.id);

    await address.set(req.body).save();

    return res.json(req.body);
  }
}

export default new AddressController();
