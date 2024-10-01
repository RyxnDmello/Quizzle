"use client";

import useRegisterCreator from "@hooks/authentication/useRegisterCreator";

import Form from "@components/Authentication/Form";
import Input from "@components/Authentication/Input";
import Button from "@components/Authentication/Button";
import Switch from "@components/Authentication/Switch";

export default function Register() {
  const { touched, errors, handleBlur, handleChange, handleSubmit } =
    useRegisterCreator();

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          label="Name"
          error={touched.name ? errors.name : undefined}
          placeholder="Nathan Drake"
          onChange={handleChange}
          onBlur={handleBlur}
        />

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
          type="number"
          name="mobile"
          label="Mobile"
          required={false}
          placeholder="9876543210"
          error={touched.mobile ? errors.mobile : undefined}
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

        <Input
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="••••••••"
          error={touched.confirmPassword ? errors.confirmPassword : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <Button
          label="Create An Account"
          disabled={Object.keys(errors).length !== 0}
        />
      </Form>

      <Switch url="/login" reason="Already Have An Account?" label="Login" />
    </section>
  );
}
