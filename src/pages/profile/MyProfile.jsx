import React, { useEffect, useState } from "react";
import ClientLayout from "../../components/layout/ClientLayout";
import UpdateProfile from "../../components/clientProfile/UpdateProfile";
import { UpdatePasswordFrm } from "../../components/clientProfile/UpdatePasswordFrm";

const MyProfile = () => {
  const [showForm, setShowForm] = useState(true);

  return (
    <ClientLayout title="My Profile">
      <div>
        <UpdateProfile />
        <hr />
      </div>
      {showForm === true && (
        <div className="mt-5">
          <h3>Update User Password</h3>
          <hr />
          <UpdatePasswordFrm />
        </div>
      )}
    </ClientLayout>
  );
};

export default MyProfile;
