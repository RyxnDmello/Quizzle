import Form from "@components/Authentication/Form";

import Switch from "@components/Authentication/Switch";

export default function Login() {
  return (
    <section>
      <Form />
      <Switch url="/register" reason="Do Not Have An Account?" label="Create" />
    </section>
  );
}
