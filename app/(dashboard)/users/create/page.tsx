import { Header, HeaderDescription, HeaderGroup, Heading } from "@/components/page-header";

import CreateUserForm from "./form";

export default function User() {
  return (
    <>
      <Header>
        <HeaderGroup>
          <Heading>Create User</Heading>
          <HeaderDescription>
            Fill out the form below to add a new user. Ensure all required information is provided before saving.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <CreateUserForm />
    </>
  );
};
