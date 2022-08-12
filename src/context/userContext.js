import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../helper/index";
import { useSnackContext } from "./snackAlertContext";
const bcrypt = require("bcryptjs");

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [userList, setUserList] = useState([]);
  const [oneUser, setOneUser] = useState({});
  const [selected, setSelected] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("userList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setUserList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`userList`, JSON.stringify(data));
    }
  };

  const createUser = async (data) => {
    setLoading(true);

    const password = await bcrypt.hash(data.password, 10);
    delete data.password;
    const tmpData = { ...data, password };
    RouterApi.createUser(tmpData)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        setUserList([...userList, resData.user]);
        setStorageData([...userList, resData.user]);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Success");
        theSnackContext.setmessage(resData.message);
        theSnackContext.setseverity("success");
      })
      .catch((err) => {
        setLoading(false);
        setActiveModal("");
        theSnackContext.setopen(true);
        theSnackContext.settitle("Error");
        theSnackContext.setmessage(err.message);
        theSnackContext.setseverity("error");
      });
  };

  const getAllUser = () => {
    setLoading(true);
    RouterApi.getAllUser()
      .then((res) => {
        const resData = res;

        setUserList(resData.users);
        setStorageData(resData.users);
        setLoading(false);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Success");
        theSnackContext.setmessage(resData.message);
        theSnackContext.setseverity("success");
      })
      .catch((err) => {
        setLoading(false);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Error");
        theSnackContext.setmessage(err.message);
        theSnackContext.setseverity("error");
      });
  };

  const getSingleUser = (id) => {
    setLoading(true);
    RouterApi.getSingleUser(id)
      .then((res) => {
        const resData = res;
        console.log(resData);

        setOneUser(resData);
        setLoading(false);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Success");
        theSnackContext.setmessage(resData.message);
        theSnackContext.setseverity("success");
      })
      .catch((err) => {
        setLoading(false);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Error");
        theSnackContext.setmessage(err.message);
        theSnackContext.setseverity("error");
      });
  };

  // for update
  const onChange = (target) => {
    const { name, value } = target;
    // console.log(target);
    setSelected((prev) => ({ ...prev, [name]: value }));
    setObjForUpdate((prev) => ({ ...prev, [name]: value }));
  };

  const updateList = (list, data) => {
    var tmplist = list;
    Object.assign(
      tmplist.find((item) => item.id === data.id),
      { ...data }
    );
    return tmplist;
  };

  const updateUser = async () => {
    setLoading(true);
    const id = selected.id;
    let tmpData = {};

    if (objForUpdate.password) {
      const password = await bcrypt.hash(objForUpdate.password, 10);
      delete objForUpdate.password;
      tmpData = { ...objForUpdate, password };
    } else {
      tmpData = { ...objForUpdate };
    }
    // console.log(objForUpdate);

    RouterApi.updateUser(tmpData, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(userList, resData.user);
        setUserList([...tmpUps]);
        setStorageData([...tmpUps]);
        setObjForUpdate({});
        theSnackContext.setopen(true);
        theSnackContext.settitle("Success");
        theSnackContext.setmessage(resData.message);
        theSnackContext.setseverity("success");
      })
      .catch((err) => {
        setLoading(false);
        setActiveModal("");
        theSnackContext.setopen(true);
        theSnackContext.settitle("Error");
        theSnackContext.setmessage(err.message);
        theSnackContext.setseverity("error");
      });
  };

  const removeFromList = (list, id) => {
    return list.filter((item) => {
      return item.id !== id;
    });
  };

  const deleteUser = (id) => {
    setLoading(true);
    RouterApi.deleteUser(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(userList, id);
        setUserList([...deleted]);
        setStorageData([...deleted]);
        setLoading(false);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Success");
        theSnackContext.setmessage(resData.message);
        theSnackContext.setseverity("success");
      })
      .catch((err) => {
        setLoading(false);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Error");
        theSnackContext.setmessage(err.message);
        theSnackContext.setseverity("error");
      });
  };

  return (
    <UserContext.Provider
      value={{
        oneUser,
        userList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,

        createUser,
        getAllUser,
        getSingleUser,
        updateUser,
        deleteUser,
        onChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
