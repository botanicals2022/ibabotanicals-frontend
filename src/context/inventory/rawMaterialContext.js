import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../helper/index";
import { useSnackContext } from "../snackAlertContext";

const RawMaterial = createContext();
export const useRawMaterial = () => useContext(RawMaterial);

const RawMaterialProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [rawMaterialList, setRawMaterialList] = useState([]);
  const [oneRawMaterial, setOneRawMaterial] = useState({});
  const [selected, setSelected] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);
  // const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("rawMaterialList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setRawMaterialList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`rawMaterialList`, JSON.stringify(data));
    }
  };

  const createRawMaterial = (data) => {
    setLoading(true);
    RouterApi.createRawMaterial(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log(resData);
        setRawMaterialList([...rawMaterialList, resData.rawMaterial]);
        setStorageData([...rawMaterialList, resData.rawMaterial]);
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

  const createRawMaterialPurchaseItem = (data) => {
    setLoading(true);
    RouterApi.createRawMaterialPurchaseItem(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log(resData);
        setRawMaterialList([...rawMaterialList, resData.rawMaterial]);
        setStorageData([...rawMaterialList, resData.rawMaterial]);
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

  const getAllRawMaterial = () => {
    setLoading(true);
    RouterApi.getAllRawMaterial()
      .then((res) => {
        const resData = res;
        // console.log("all RawMaterial", resData);

        setRawMaterialList(resData.rawMaterialList);
        setStorageData(resData.rawMaterialList);
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

  const getSingleRawMaterial = (id) => {
    setLoading(true);
    RouterApi.getSingleRawMaterial(id)
      .then((res) => {
        const resData = res;
        console.log(resData);

        setOneRawMaterial(resData);
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

  const updateRawMaterial = () => {
    setLoading(true);
    const id = selected.id;
    RouterApi.updateRawMaterial(objForUpdate, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(rawMaterialList, resData.rawMaterial);
        setRawMaterialList([...tmpUps]);
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

  const updateRawMaterialPurchaseItem = () => {
    setLoading(true);
    const id = selected.id;
    RouterApi.updateRawMaterialPurchaseItem(objForUpdate, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(rawMaterialList, resData.rawMaterial);
        setRawMaterialList([...tmpUps]);
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

  const deleteRawMaterial = (id) => {
    setLoading(true);
    RouterApi.deleteRawMaterial(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(rawMaterialList, id);
        setRawMaterialList([...deleted]);
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
    <RawMaterial.Provider
      value={{
        oneRawMaterial,
        rawMaterialList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,
        // completed,

        createRawMaterial,
        createRawMaterialPurchaseItem,
        getAllRawMaterial,
        getSingleRawMaterial,
        updateRawMaterial,
        updateRawMaterialPurchaseItem,
        deleteRawMaterial,
        onChange,
      }}
    >
      {children}
    </RawMaterial.Provider>
  );
};

export default RawMaterialProvider;
