"use client";

import useLogin from "@hooks/authentication/useLogin";

import Title from "@components/Authentication/Title";
import Form from "@components/Authentication/Form";
import Input from "@components/Authentication/Input";
import Button from "@components/Authentication/Button";
import Switch from "@components/Authentication/Switch";
import Error from "@components/Common/Error";

export default function Login() {
  const {
    touched,
    error,
    errors,
    isPending,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useLogin();

  return (
    <section>
      <Title primary="Welcome" secondary="Back" />

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

        <Error error={error} fontSize="0.95rem" />

        <Button
          label="Login"
          disabled={Object.keys(errors).length !== 0 || isPending}
        />
      </Form>

      <Switch url="/register" reason="Don't Have An Account?" label="Create" />
    </section>
  );
}
