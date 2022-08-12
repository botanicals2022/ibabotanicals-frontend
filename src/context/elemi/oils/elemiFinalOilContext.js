import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../../helper/index";
import { useSnackContext } from "../../snackAlertContext";

const ElemiFinalOilContext = createContext();
export const useElemiFinalOilContext = () => useContext(ElemiFinalOilContext);

const ElemiFinalOilProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [finalOilList, setFinalOilList] = useState([]);
  const [oneFinalOil, setOneFinalOil] = useState({});
  const [selected, setSelected] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("eFOList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setFinalOilList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`eFOList`, JSON.stringify(data));
    }
  };

  const createFinalOil = (data) => {
    setLoading(true);
    RouterApi.createElemiFinalOil(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log(resData);
        setFinalOilList([...finalOilList, resData.elemiFinalOil]);
        setStorageData([...finalOilList, resData.elemiFinalOil]);
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

  const getAllFinalOil = () => {
    setLoading(true);
    RouterApi.getAllElemiFinalOil()
      .then((res) => {
        const resData = res;

        setFinalOilList(resData.elemiFinalOilList);
        setStorageData(resData.elemiFinalOilList);
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

  const getSingleFinalOil = (id) => {
    setLoading(true);
    RouterApi.getSingleElemi(id)
      .then((res) => {
        const resData = res;
        // console.log(resData);

        setOneFinalOil(resData.elemiFinalOil);
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
    if (name === "elemiFilipina" || name === "hSE") {
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

  const updateFinalOil = () => {
    setLoading(true);
    const id = selected.id;
    RouterApi.updateElemiFinalOil(objForUpdate, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(finalOilList, resData.elemiFinalOil);
        setFinalOilList([...tmpUps]);
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

  const deleteFinalOil = (id) => {
    setLoading(true);
    RouterApi.deleteElemiFinalOil(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(finalOilList, id);
        setFinalOilList([...deleted]);
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
    <ElemiFinalOilContext.Provider
      value={{
        oneFinalOil,
        finalOilList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,

        createFinalOil,
        getAllFinalOil,
        getSingleFinalOil,
        updateFinalOil,
        deleteFinalOil,
        onChange,
      }}
    >
      {children}
    </ElemiFinalOilContext.Provider>
  );
};

export default ElemiFinalOilProvider;
