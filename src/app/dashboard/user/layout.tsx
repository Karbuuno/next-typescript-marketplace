import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
};

export default UserLayout;
