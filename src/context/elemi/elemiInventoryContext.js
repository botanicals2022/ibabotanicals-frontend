import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../helper/index";
import { useSnackContext } from "../snackAlertContext";

const InventoryContext = createContext();
export const useElemiInventoryContext = () => useContext(InventoryContext);

const ElemiInventoryProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [inventoryList, setInventoryList] = useState([]);
  const [oneInventory, setOneInventory] = useState({});
  const [selected, setSelected] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("elemiInventoryList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setInventoryList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`elemiInventoryList`, JSON.stringify(data));
    }
  };

  const createInventory = (data) => {
    setLoading(true);
    RouterApi.createElemiInventory(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        console.log(resData);
        setInventoryList([...inventoryList, resData.inventory]);
        setStorageData([...inventoryList, resData.inventory]);
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

  const getAllInventory = () => {
    setLoading(true);
    RouterApi.getAllElemiInventory()
      .then((res) => {
        const resData = res;

        setInventoryList(resData.inventories);
        setStorageData(resData.inventories);
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

  const getSingleInventory = (id) => {
    setLoading(true);
    RouterApi.getSingleInventory(id)
      .then((res) => {
        const resData = res;
        console.log(resData);

        setOneInventory(resData);
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
    console.log(name, value);
    if (name === "percentage" || name === "quantity") {
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

  const updateInventory = () => {
    setLoading(true);
    const id = selected.id;
    RouterApi.updateElemiInventory(objForUpdate, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(inventoryList, resData.inventory);
        setInventoryList([...tmpUps]);
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

  const deleteInventory = (id) => {
    setLoading(true);
    RouterApi.deleteElemiInventory(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(inventoryList, id);
        setInventoryList([...deleted]);
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
    <InventoryContext.Provider
      value={{
        oneInventory,
        inventoryList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,

        createInventory,
        getAllInventory,
        getSingleInventory,
        updateInventory,
        deleteInventory,
        onChange,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default ElemiInventoryProvider;
