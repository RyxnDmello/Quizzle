import Form from "@components/Authentication/Form";

import Switch from "@components/Authentication/Switch";

export default function Register() {
  return (
    <section>
      <Form />
      <Switch url="/login" reason="Already Have An Account?" label="Login" />
    </section>
  );
}
