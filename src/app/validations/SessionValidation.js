import * as Yup from 'yup';

class SessionValidation {
  async isValidStore(req) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    return !(await schema.isValid(req.body));
  }
}

export default new SessionValidation();
