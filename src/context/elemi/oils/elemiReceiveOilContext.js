import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../../helper/index";
import { useSnackContext } from "../../snackAlertContext";

const ElemiReceiveOilContext = createContext();
export const useElemiReceiveOilContext = () =>
  useContext(ElemiReceiveOilContext);

const ElemiReceiveOilProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [receiveOilList, setReceiveOilList] = useState([]);
  const [oneReceiveOil, setOneReceiveOil] = useState({});
  const [selected, setSelected] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);

  const [counter, setCounter] = useState(0);
  const [objList, setObjList] = useState([]);

  useEffect(() => {
    const storageItem = localStorage.getItem("eROList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setReceiveOilList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`eROList`, JSON.stringify(data));
    }
  };

  const createReceiveOil = (data) => {
    setLoading(true);
    RouterApi.createElemiReceiveOil(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log(resData);
        setReceiveOilList([...receiveOilList, resData.elemiReceiveOil]);
        setStorageData([...receiveOilList, resData.elemiReceiveOil]);
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

  const getAllReceiveOil = () => {
    setLoading(true);
    RouterApi.getAllElemiReceiveOil()
      .then((res) => {
        const resData = res;

        setReceiveOilList(resData.elemiReceiveOilList);
        setStorageData(resData.elemiReceiveOilList);
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

  const getSingleReceiveOil = (id) => {
    setLoading(true);
    RouterApi.getSingleElemi(id)
      .then((res) => {
        const resData = res;
        // console.log(resData);

        setOneReceiveOil(resData.elemiReceiveOil);
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

  useEffect(() => {
    getOilsTotal(objList);
  }, [objList, counter]);
  // }, [selected, counter]);

  const onAddToCheckList = (row, isChkd, idx) => {
    let tmpData = {
      id: row.id,
      selected: isChkd,
      averageFlowRate: row.averageFlowRate,
      totalOilRecovery: row.totalOilRecovery,
      oilBatchNumber: row.oilBatchNumber,
    };
    if (isChkd) {
      setObjList((prev) => [...prev, tmpData]);
    } else {
      let tmp_idx = objList.findIndex((item) => item.id === row.id);
      objList.splice(tmp_idx, 1);
    }
    setCounter(counter + 1);
  };

  const onAddToRecordList = (cname, value, rowId) => {
    let tmpRowData = objList.find((item) => item.id === rowId);
    if (!tmpRowData) return;
    Object.assign(tmpRowData, { [cname]: parseFloat(value) });
    setCounter(counter + 1);
  };

  // for update
  const onChange = (target) => {
    const { name, value } = target;
    setSelected((prev) => ({ ...prev, [name]: value }));
    setObjForUpdate((prev) => ({ ...prev, [name]: value }));
    getOilsTotal(objList);
  };

  const getOilsTotal = (list) => {
    let tmpHSE = 0;
    let tmpElemiFilipina = 0;
    let tmpFlowRate = 0;
    let tmpOilRecovery = 0;
    list.forEach((item) => {
      tmpFlowRate += item.averageFlowRate;
      tmpOilRecovery += item.totalOilRecovery;
      tmpHSE += item.hSE ? item.hSE : 0;
      tmpElemiFilipina += item.elemiFilipina ? item.elemiFilipina : 0;
    });

    setObjForUpdate((prev) => ({
      ...prev,
      totalHSE: tmpHSE,
      totalElemiFilipina: tmpElemiFilipina,
      totalFlowRate: tmpFlowRate,
      totalOilRecovery: tmpOilRecovery,
    }));
    setSelected((prev) => ({
      ...prev,
      totalHSE: tmpHSE,
      totalElemiFilipina: tmpElemiFilipina,
      totalFlowRate: tmpFlowRate,
      totalOilRecovery: tmpOilRecovery,
    }));
  };

  const updateList = (list, data) => {
    var tmplist = list;
    Object.assign(
      tmplist.find((item) => item.id === data.id),
      { ...data }
    );
    return tmplist;
  };

  const updateReceiveOil = () => {
    setLoading(true);

    const id = selected.id;
    console.log(objForUpdate);
    // RouterApi.updateElemiReceiveOil({ ...objForUpdate, tblRows: objList }, id)
    //   .then((res) => {
    //     const resData = res;
    //     setLoading(false);
    //     setActiveModal("");

    //     const tmpUps = updateList(receiveOilList, resData.elemiReceiveOil);
    //     setReceiveOilList([...tmpUps]);
    //     setStorageData([...tmpUps]);
    //     setObjForUpdate({});
    //     theSnackContext.setopen(true);
    //     theSnackContext.settitle("Success");
    //     theSnackContext.setmessage(resData.message);
    //     theSnackContext.setseverity("success");
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     setActiveModal("");
    //     theSnackContext.setopen(true);
    //     theSnackContext.settitle("Error");
    //     theSnackContext.setmessage(err.message);
    //     theSnackContext.setseverity("error");
    //   });
  };

  const removeFromList = (list, id) => {
    return list.filter((item) => {
      return item.id !== id;
    });
  };

  const deleteReceiveOil = (id) => {
    setLoading(true);
    RouterApi.deleteElemiReceiveOil(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(receiveOilList, id);
        setReceiveOilList([...deleted]);
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
    <ElemiReceiveOilContext.Provider
      value={{
        oneReceiveOil,
        receiveOilList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,

        createReceiveOil,
        getAllReceiveOil,
        getSingleReceiveOil,
        updateReceiveOil,
        deleteReceiveOil,
        onChange,

        onAddToCheckList,
        onAddToRecordList,
      }}
    >
      {children}
    </ElemiReceiveOilContext.Provider>
  );
};

export default ElemiReceiveOilProvider;
