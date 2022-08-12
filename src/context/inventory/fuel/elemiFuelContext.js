import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../../helper/index";
import { useSnackContext } from "../../../context/snackAlertContext";

const ElemiFuelContext = createContext();
export const useElemiFuelContext = () => useContext(ElemiFuelContext);

const ElemiFuelProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [fuelList, setFuelList] = useState([]);
  const [oneFuel, setOneFuel] = useState({});
  const [selected, setSelected] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);
  // const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("elemiFuelList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setFuelList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`elemiFuelList`, JSON.stringify(data));
    }
  };

  const createElemiFuel = (data) => {
    setLoading(true);
    RouterApi.createElemiFuel(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log("resData", resData);
        setFuelList([...fuelList, resData.elemiFuel]);
        setStorageData([...fuelList, resData.elemiFuel]);
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

  const getAllElemiFuel = () => {
    setLoading(true);
    RouterApi.getAllElemiFuel()
      .then((res) => {
        const resData = res;
        // console.log("all elemi Fuel", resData);

        setFuelList(resData.elemiFuelList);
        setStorageData(resData.elemiFuelList);
        setFuelList(JSON.parse(resData.elemiFuelList));
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

  const getSingleFuel = (id) => {
    setLoading(true);
    RouterApi.getSingleFuel(id)
      .then((res) => {
        const resData = res;
        console.log(resData);

        setOneFuel(resData);
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
    if (name === "quantity" || name === "consumed") {
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

  const updateElemiFuel = () => {
    setLoading(true);
    const id = selected.id;
    RouterApi.updateElemiFuel(objForUpdate, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(fuelList, resData.elemiFuel);
        setFuelList([...tmpUps]);
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

  const deleteElemiFuel = (id) => {
    setLoading(true);
    RouterApi.deleteElemiFuel(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(fuelList, id);
        setFuelList([...deleted]);
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
    <ElemiFuelContext.Provider
      value={{
        oneFuel,
        fuelList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,
        // completed,

        createElemiFuel,
        getAllElemiFuel,
        getSingleFuel,
        updateElemiFuel,
        deleteElemiFuel,
        onChange,
      }}
    >
      {children}
    </ElemiFuelContext.Provider>
  );
};

export default ElemiFuelProvider;
