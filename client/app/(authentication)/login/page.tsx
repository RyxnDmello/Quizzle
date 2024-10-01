"use client";

import useLoginCreator from "@hooks/authentication/useLoginCreator";

import Form from "@components/Authentication/Form";
import Input from "@components/Authentication/Input";
import Button from "@components/Authentication/Button";
import Switch from "@components/Authentication/Switch";

export default function Login() {
  const { touched, errors, handleBlur, handleChange, handleSubmit } =
    useLoginCreator();

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="nathan@domain.com"
          error={touched.email ? errors.email : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="••••••••"
          error={touched.password ? errors.password : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <Button label="Login" disabled={Object.keys(errors).length !== 0} />
      </Form>

      <Switch url="/register" reason="Do Not Have An Account?" label="Create" />
    </section>
  );
}
