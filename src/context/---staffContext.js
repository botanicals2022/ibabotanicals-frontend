import { createContext, useContext, useState } from "react";
import RouterApi from "../helper/index";

const StaffContext = createContext();
export const useStaffContext = () => useContext(StaffContext);

const StaffProvider = ({ children }) => {
  const [staffList, setStaffList] = useState([]);
  const [oneStaff, setOneStaff] = useState({});
  const [activeModal, setActiveModal] = useState("");

  const createStaff = () => {
    RouterApi.createStaff()
      .then((res) => {
        const resData = res;
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllStaff = () => {
    RouterApi.getAllStaff()
      .then((res) => {
        const resData = res;
        console.log(resData);
        setStaffList(resData.staffs);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getSingleStaff = (id) => {
    RouterApi.getSingleStaff(id)
      .then((res) => {
        const resData = res;
        console.log(resData);
        setOneStaff(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateStaff = (id) => {
    RouterApi.updateStaff(id)
      .then((res) => {
        const resData = res;
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteStaff = (id) => {
    RouterApi.deleteStaff(id)
      .then((res) => {
        const resData = res;
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <StaffContext.Provider
      value={{
        oneStaff,
        staffList,
        createStaff,
        getAllStaff,
        getSingleStaff,
        updateStaff,
        deleteStaff,

        activeModal,
        setActiveModal,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};

export default StaffProvider;
