import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../../helper/index";
import { useSnackContext } from "../../snackAlertContext";

const OfficeContext = createContext();
export const useOfficeContext = () => useContext(OfficeContext);

const OfficeProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [officeList, setOfficeList] = useState([]);
  const [oneOffice, setOneOffice] = useState({});
  const [selected, setSelected] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);
  // const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("consumableOfficeList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setOfficeList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`consumableOfficeList`, JSON.stringify(data));
    }
  };

  const createOffice = (data) => {
    setLoading(true);
    RouterApi.createOfficeConsumable(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log(resData);
        setOfficeList([...officeList, resData.officeConsumable]);
        setStorageData([...officeList, resData.officeConsumable]);
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

  const createOfficePurchaseItem = (data) => {
    setLoading(true);
    RouterApi.createOfficeConsumablePurchaseItem(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log(resData);
        setOfficeList([...officeList, resData.officeConsumable]);
        setStorageData([...officeList, resData.officeConsumable]);
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

  const getAllOffice = () => {
    setLoading(true);
    RouterApi.getAllOfficeConsumable()
      .then((res) => {
        const resData = res;
        // console.log("all Office", resData);

        setOfficeList(resData.officeConsumables);
        setStorageData(resData.officeConsumables);
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

  const getSingleOffice = (id) => {
    setLoading(true);
    RouterApi.getSingleOfficeConsumable(id)
      .then((res) => {
        const resData = res;
        console.log(resData);

        setOneOffice(resData.officeConsumable);
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

  const updateOffice = () => {
    setLoading(true);
    const id = selected.id;
    RouterApi.updateOfficeConsumable(objForUpdate, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(officeList, resData.officeConsumable);
        setOfficeList([...tmpUps]);
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

  const updateOfficePurchaseItem = () => {
    setLoading(true);
    const id = selected.id;
    RouterApi.updateOfficeConsumablePurchaseItem(objForUpdate, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(officeList, resData.officeConsumable);
        setOfficeList([...tmpUps]);
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

  const deleteOffice = (id) => {
    setLoading(true);
    RouterApi.deleteOfficeConsumable(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(officeList, id);
        setOfficeList([...deleted]);
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
    <OfficeContext.Provider
      value={{
        oneOffice,
        officeList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,
        // completed,

        createOffice,
        createOfficePurchaseItem,
        getAllOffice,
        getSingleOffice,
        updateOffice,
        updateOfficePurchaseItem,
        deleteOffice,
        onChange,
      }}
    >
      {children}
    </OfficeContext.Provider>
  );
};

export default OfficeProvider;
