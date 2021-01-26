import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import CmsLayout from "@components/layouts/CmsLayout";
import Input from "components/form/Input";
import useUser from "@utils/useUser";
import fetchJson from "@utils/fetchJson";
const Form = dynamic(() => import("components/form/Form"), {
  ssr: false,
});

export default function LoginPage() {
  const [auth, setAuth] = useState({});

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
    <CmsLayout>
      <div className="md:w-1/3 sm:w-full h-screen object-center flex items-center mx-auto">
        <Form value={auth} setValue={setAuth} onSave={onLogin}>
          <Input label="Email" placeholder="Enter your email" />
          <Input label="Password" placeholder="Enter your password" />
        </Form>
      </div>
    </CmsLayout>
  );
}
