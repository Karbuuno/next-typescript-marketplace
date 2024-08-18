import React from "react";
import Products from "./(pages)/products/page";
import CategoriesPage from "./(pages)/category/page";
import Customers from "./(pages)/users/page";

const AdminPage = () => {
  return (
    <main className=''>
      <Products />
      <CategoriesPage />
      <Customers />
    </main>
  );
};

export default AdminPage;
