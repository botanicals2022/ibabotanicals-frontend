import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../../helper/index";
import { useSnackContext } from "../../snackAlertContext";

const OtherContext = createContext();
export const useOtherContext = () => useContext(OtherContext);

const OtherProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [otherList, setOtherList] = useState([]);
  const [oneOther, setOneOther] = useState({});
  const [selected, setSelected] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);
  // const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("consumableOtherList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setOtherList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`consumableOtherList`, JSON.stringify(data));
    }
  };

  const createOther = (data) => {
    setLoading(true);
    RouterApi.createOtherConsumable(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log(resData);
        setOtherList([...otherList, resData.otherConsumable]);
        setStorageData([...otherList, resData.otherConsumable]);
        // setCompleted(true);
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

  const createOtherPurchaseItem = (data) => {
    setLoading(true);
    RouterApi.createOtherConsumablePurchaseItem(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log(resData);
        setOtherList([...otherList, resData.otherConsumable]);
        setStorageData([...otherList, resData.otherConsumable]);
        // setCompleted(true);
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

  const getAllOther = () => {
    setLoading(true);
    RouterApi.getAllOtherConsumable()
      .then((res) => {
        const resData = res;
        // console.log("all Other", resData);

        setOtherList(resData.otherConsumables);
        setStorageData(resData.otherConsumables);
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

  const getSingleOther = (id) => {
    setLoading(true);
    RouterApi.getSingleOtherConsumable(id)
      .then((res) => {
        const resData = res;
        console.log(resData);

        setOneOther(resData.otherConsumable);
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
    if (name === "quantity") {
      setSelected((prev) => ({ ...prev, [name]: parseFloat(value) }));
      setObjForUpdate((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setSelected((prev) => ({ ...prev, [name]: value }));
      setObjForUpdate((prev) => ({ ...prev, [name]: value }));
    }
  };

  const updateList = (list, data) => {
    var tmplist = list;
    Object.assign(
      tmplist.find((item) => item.id === data.id),
      { ...data }
    );
    return tmplist;
  };

  const updateOther = () => {
    setLoading(true);
    const id = selected.id;
    RouterApi.updateOtherConsumable(objForUpdate, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(otherList, resData.otherConsumable);
        setOtherList([...tmpUps]);
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

  const updateOtherPurchaseItem = () => {
    setLoading(true);
    const id = selected.id;
    RouterApi.updateOtherConsumablePurchaseItem(objForUpdate, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(otherList, resData.otherConsumable);
        setOtherList([...tmpUps]);
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

  const deleteOther = (id) => {
    setLoading(true);
    RouterApi.deleteOtherConsumable(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(otherList, id);
        setOtherList([...deleted]);
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
    <OtherContext.Provider
      value={{
        oneOther,
        otherList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,
        // completed,

        createOther,
        createOtherPurchaseItem,
        getAllOther,
        getSingleOther,
        updateOther,
        updateOtherPurchaseItem,
        deleteOther,
        onChange,
      }}
    >
      {children}
    </OtherContext.Provider>
  );
};

export default OtherProvider;
