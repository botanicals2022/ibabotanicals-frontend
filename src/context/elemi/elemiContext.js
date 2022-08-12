import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../helper/index";
import { useSnackContext } from "../snackAlertContext";

const ElemiContext = createContext();
export const useElemiContext = () => useContext(ElemiContext);

const ElemiProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [elemiList, setElemiList] = useState([]);
  const [oneElemi, setOneElemi] = useState({});
  const [selected, setSelected] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("elemiList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setElemiList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`elemiList`, JSON.stringify(data));
    }
  };

  const createElemi = (data) => {
    setLoading(true);
    RouterApi.createElemi(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log(resData);
        setElemiList([...elemiList, resData.elemi]);
        setStorageData([...elemiList, resData.elemi]);
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

  const getAllElemi = () => {
    setLoading(true);
    RouterApi.getAllElemi()
      .then((res) => {
        const resData = res;

        setElemiList(resData.elemiList);
        setStorageData(resData.elemiList);
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

  const getSingleElemi = (id) => {
    setLoading(true);
    RouterApi.getSingleElemi(id)
      .then((res) => {
        const resData = res;
        // console.log(resData);

        setOneElemi(resData);
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
    // console.log("isOptionEqualToValue", target);
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

  const updateElemi = () => {
    setLoading(true);
    const id = selected.id;
    RouterApi.updateElemi(objForUpdate, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(elemiList, resData.elemi);
        setElemiList([...tmpUps]);
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

  const deleteElemi = (id) => {
    setLoading(true);
    RouterApi.deleteElemi(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(elemiList, id);
        setElemiList([...deleted]);
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
    <ElemiContext.Provider
      value={{
        oneElemi,
        elemiList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,

        createElemi,
        getAllElemi,
        getSingleElemi,
        updateElemi,
        deleteElemi,
        onChange,
      }}
    >
      {children}
    </ElemiContext.Provider>
  );
};

export default ElemiProvider;
