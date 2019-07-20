import * as Yup from 'yup';

class AddressValidation {
  async isValidStore(req) {
    const schema = Yup.object().shape({
      ds_address: Yup.string()
        .required()
        .min(6),
      city: Yup.string(),
      zip_code: Yup.string(),
      country: Yup.string(),
      state: Yup.string(),
      number: Yup.string(),
    });

    return !(await schema.isValid(req.body));
  }

  async isValidUpdate(req) {
    const schema = Yup.object().shape({
      ds_address: Yup.string().min(6),
      city: Yup.string(),
      zip_code: Yup.string(),
      country: Yup.string(),
      state: Yup.string(),
      number: Yup.string(),
    });

    return !(await schema.isValid(req.body));
  }
}

export default new AddressValidation();
