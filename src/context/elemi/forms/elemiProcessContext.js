import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../../helper/index";
import { useSnackContext } from "../../snackAlertContext";

import HourTime from "../../../plugins/hour-calculator";

const ProcessContext = createContext();
export const useElemiProcessContext = () => useContext(ProcessContext);

const ElemiProcessProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [processList, setProcessList] = useState([]);
  const [oneProcess, setOneProcess] = useState({});
  const [selected, setSelected] = useState({});
  const [jsonObject, setJsonObject] = useState({});

  // const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("ePrcList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setProcessList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`ePrcList`, JSON.stringify(data));
    }
  };

  const createProcess = (json, data) => {
    setLoading(true);
    RouterApi.createElemiProcess({ jsonObject: { ...json }, ...data })
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log(resData);
        setProcessList([...processList, resData.elemiProcess]);
        setStorageData([...processList, resData.elemiProcess]);
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

  const getAllProcess = () => {
    setLoading(true);
    RouterApi.getAllElemiProcess()
      .then((res) => {
        const resData = res;

        setProcessList(resData.elemiProcessList);
        setStorageData(resData.elemiProcessList);
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

  const getSingleProcess = (id) => {
    setLoading(true);
    RouterApi.getSingleProcess(id)
      .then((res) => {
        const resData = res;
        // console.log(resData);

        setOneProcess(resData);
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
    let tmpTime = [];

    let tmpCount = 0;
    let tmpAveFlowRate = 0;
    let tmpOilRecovered = 0;
    let tmpResinWeight = 0;

    const averageFlowRate = (frate) => {
      return (tmpAveFlowRate += parseFloat(frate));
    };

    for (const [key, value] of Object.entries(jsonObject)) {
      const tmpNum = value.toString().replace(/[a-zA-Z]+/gi, "");

      if (key.includes("time_00")) {
        let tempConv = HourTime(value);
        if (tempConv > 0) {
          tmpTime.push(tempConv);
        }
      }

      if (tmpNum) {
        if (tmpNum > 0) {
          if (key.includes("flow_rate")) {
            tmpCount += 1;
            let tmpFRate = averageFlowRate(tmpNum) / tmpCount;
            setSelected((prev) => ({ ...prev, averageFlowRate: tmpFRate }));
          }
          if (key.includes("oil_recovery")) {
            tmpOilRecovered += parseFloat(tmpNum);
            setSelected((prev) => ({
              ...prev,
              totalOilRecovery: tmpOilRecovered,
            }));
          }
          if (key.includes("resin_weight_count")) {
            tmpResinWeight += parseFloat(tmpNum);
            setSelected((prev) => ({
              ...prev,
              totalResinWeight: tmpResinWeight,
            }));
          }
        }
      }
    }

    const tTime = (rtime) => {
      if (rtime.length > 0) {
        let stmptime = rtime.sort((a, b) => b - a);
        return stmptime[0] - stmptime[stmptime.length - 1];
      } else {
        return 0;
      }
    };

    setSelected((prev) => ({ ...prev, totalTime: tTime(tmpTime) }));
  }, [jsonObject]);

  useEffect(() => {
    const { totalResinWeight, totalOilRecovery } = selected;
    let cdisposal =
      parseFloat(totalResinWeight) - parseFloat(totalOilRecovery * 0.001);

    setJsonObject((prev) => ({
      ...prev,
      compliant_disposal_1: cdisposal,
    }));
  }, [selected.totalResinWeight, selected.totalOilRecovery]);

  // for update
  const onChange = (gname = "", target) => {
    const { name, value, textContent } = target;
    if (name) {
      setJsonObject((prev) => ({ ...prev, [name]: value }));
    }
    if (gname) {
      setJsonObject((prev) => ({ ...prev, [gname]: textContent }));
    }
  };

  const numberOnly = (data) => {
    return parseFloat(data.replace(/\D/gi, ""));
  };

  const onChange2 = (gname = "", target) => {
    const { textContent } = target;
    if (gname === "totalResinWeight" || gname === "fuelConsumed") {
      setSelected((prev) => ({ ...prev, [gname]: numberOnly(textContent) }));
    } else {
      setSelected((prev) => ({ ...prev, [gname]: textContent }));
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

  const updateProcessStatus = (bool, pk_id) => {
    setLoading(true);

    RouterApi.updateElemiProcess({ isConsumed: bool }, pk_id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(processList, resData.elemiProcess);
        setProcessList([...tmpUps]);
        setStorageData([...tmpUps]);
        // setObjForUpdate({});
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

  const updateProcess = () => {
    setLoading(true);
    const id = selected.id;

    selected.jsonObject = jsonObject;

    RouterApi.updateElemiProcess(selected, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(processList, resData.elemiProcess);
        setProcessList([...tmpUps]);
        setStorageData([...tmpUps]);
        // setObjForUpdate({});
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

  const deleteProcess = (id) => {
    setLoading(true);
    RouterApi.deleteElemiProcess(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(processList, id);
        setProcessList([...deleted]);
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
    <ProcessContext.Provider
      value={{
        oneProcess,
        processList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,
        jsonObject,
        setJsonObject,

        createProcess,
        getAllProcess,
        getSingleProcess,
        updateProcessStatus,
        updateProcess,
        deleteProcess,
        onChange,
        onChange2,
      }}
    >
      {children}
    </ProcessContext.Provider>
  );
};

export default ElemiProcessProvider;
