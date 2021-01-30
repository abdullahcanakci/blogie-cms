import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import CenterLayout from "@components/layouts/CenterLayout";
import Input from "components/form/Input";
import useUser from "@utils/useUser";
import fetchJson from "@utils/fetchJson";
const Form = dynamic(() => import("components/form/Form"), {
  ssr: false,
});

export default function LoginPage() {
  const { mutateUser } = useUser({
    redirectTo: "/cms",
    redirectIfFound: true,
  });

  const onLogin = async (data) => {
    await mutateUser(
      fetchJson("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    );
  };

  return (
    <CenterLayout>
      <Form onSave={onLogin} className="is-half">
        <Input label="Email" dataKey="email" placeholder="Enter your email" />
        <Input
          label="Password"
          dataKey="password"
          placeholder="Enter your password"
        />
      </Form>
    </CenterLayout>
  );
}
