import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../../helper/index";
import { useSnackContext } from "../../snackAlertContext";

const MaintenanceContext = createContext();
export const useMaintenanceContext = () => useContext(MaintenanceContext);

const MaintenanceProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [maintenanceList, setMaintenanceList] = useState([]);
  const [oneMaintenance, setOneMaintenance] = useState({});
  const [selected, setSelected] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);
  // const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("consumableMaintenanceList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setMaintenanceList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`consumableMaintenanceList`, JSON.stringify(data));
    }
  };

  const createMaintenance = (data) => {
    setLoading(true);
    RouterApi.createMaintenanceConsumable(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log(resData);
        setMaintenanceList([...maintenanceList, resData.maintenanceConsumable]);
        setStorageData([...maintenanceList, resData.maintenanceConsumable]);
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

  const createMaintenancePurchaseItem = (data) => {
    setLoading(true);
    RouterApi.createMaintenanceConsumablePurchaseItem(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log(resData);
        setMaintenanceList([...maintenanceList, resData.maintenanceConsumable]);
        setStorageData([...maintenanceList, resData.maintenanceConsumable]);
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

  const getAllMaintenance = () => {
    setLoading(true);
    RouterApi.getAllMaintenanceConsumable()
      .then((res) => {
        const resData = res;
        // console.log("all Maintenance", resData);

        setMaintenanceList(resData.maintenanceConsumables);
        setStorageData(resData.maintenanceConsumables);
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

  const getSingleMaintenance = (id) => {
    setLoading(true);
    RouterApi.getSingleMaintenance(id)
      .then((res) => {
        const resData = res;
        console.log(resData);

        setOneMaintenance(resData.maintenanceConsumable);
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

  const updateMaintenance = () => {
    setLoading(true);
    const id = selected.id;
    RouterApi.updateMaintenanceConsumable(objForUpdate, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(
          maintenanceList,
          resData.maintenanceConsumable
        );
        setMaintenanceList([...tmpUps]);
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

  const updateMaintenancePurchaseItem = () => {
    setLoading(true);
    const id = selected.id;
    RouterApi.updateMaintenanceConsumablePurchaseItem(objForUpdate, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(
          maintenanceList,
          resData.maintenanceConsumable
        );
        setMaintenanceList([...tmpUps]);
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

  const deleteMaintenance = (id) => {
    setLoading(true);
    RouterApi.deleteMaintenanceConsumable(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(maintenanceList, id);
        setMaintenanceList([...deleted]);
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
    <MaintenanceContext.Provider
      value={{
        oneMaintenance,
        maintenanceList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,
        // completed,

        createMaintenance,
        createMaintenancePurchaseItem,
        getAllMaintenance,
        getSingleMaintenance,
        updateMaintenance,
        updateMaintenancePurchaseItem,
        deleteMaintenance,
        onChange,
      }}
    >
      {children}
    </MaintenanceContext.Provider>
  );
};

export default MaintenanceProvider;
