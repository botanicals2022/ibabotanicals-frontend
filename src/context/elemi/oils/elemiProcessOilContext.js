import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../../helper/index";
import { useSnackContext } from "../../snackAlertContext";

const ElemiProcessOilContext = createContext();
export const useElemiProcessOilContext = () =>
  useContext(ElemiProcessOilContext);

const ElemiProcessOilProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [processOilList, setProcessOilList] = useState([]);
  const [oneProcessOil, setOneProcessOil] = useState({});
  const [selected, setSelected] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("ePOList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setProcessOilList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`ePOList`, JSON.stringify(data));
    }
  };

  const createProcessOil = (data) => {
    setLoading(true);
    RouterApi.createElemiProcessOil(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log(resData);
        setProcessOilList([...processOilList, resData.elemiProcessedOil]);
        setStorageData([...processOilList, resData.elemiProcessedOil]);
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

  const getAllProcessOil = () => {
    setLoading(true);
    RouterApi.getAllElemiProcessOil()
      .then((res) => {
        const resData = res;

        setProcessOilList(resData.elemiProcessedOilList);
        setStorageData(resData.elemiProcessedOilList);
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

  const getSingleProcessOil = (id) => {
    setLoading(true);
    RouterApi.getSingleElemi(id)
      .then((res) => {
        const resData = res;
        // console.log(resData);

        setOneProcessOil(resData.elemiProcessedOil);
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
    if (
      name === "batchNumber" ||
      name === "prodShift" ||
      name === "distillationDate"
    ) {
      setSelected((prev) => ({ ...prev, [name]: value }));
      setObjForUpdate((prev) => ({ ...prev, [name]: value }));
    } else {
      setSelected((prev) => ({ ...prev, [name]: parseFloat(value) }));
      setObjForUpdate((prev) => ({ ...prev, [name]: parseFloat(value) }));
    }
  };

  const totalLoss = (obj) => {
    let tmpLimLoss = obj.hSELoss ?? 0;
    let tmpEFelLoss = obj.elemiFilipinaLoss ?? 0;
    return tmpLimLoss + tmpEFelLoss;
  };

  const totalOilYieldRecovery = (obj) => {
    let tmpLim = obj.hSE ?? 0;
    let tmpEFelipina = obj.elemiFilipina ?? 0;
    return tmpLim + tmpEFelipina;
  };

  useEffect(() => {
    setSelected((prev) => ({ ...prev, totalLoss: totalLoss(selected) }));
    setSelected((prev) => ({
      ...prev,
      recoveredOil: totalOilYieldRecovery(selected),
    }));
  }, [objForUpdate]);

  const updateList = (list, data) => {
    var tmplist = list;
    Object.assign(
      tmplist.find((item) => item.id === data.id),
      { ...data }
    );
    return tmplist;
  };

  const updateProcessOil = () => {
    setLoading(true);
    const id = selected.id;

    RouterApi.updateElemiProcessOil(
      {
        ...objForUpdate,
        totalLoss: selected.totalLoss,
        recoveredOil: selected.recoveredOil,
      },
      id
    )
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(processOilList, resData.elemiProcessedOil);
        setProcessOilList([...tmpUps]);
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

  const deleteProcessOil = (id) => {
    setLoading(true);
    RouterApi.deleteElemiProcessOil(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(processOilList, id);
        setProcessOilList([...deleted]);
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
    <ElemiProcessOilContext.Provider
      value={{
        oneProcessOil,
        processOilList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,

        createProcessOil,
        getAllProcessOil,
        getSingleProcessOil,
        updateProcessOil,
        deleteProcessOil,
        onChange,
      }}
    >
      {children}
    </ElemiProcessOilContext.Provider>
  );
};

export default ElemiProcessOilProvider;
