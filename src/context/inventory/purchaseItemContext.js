import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../helper/index";
import { useSnackContext } from "../snackAlertContext";

const PurchaseItemContext = createContext();
export const usePurchaseItemContext = () => useContext(PurchaseItemContext);

const PurchaseItemProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [purchaseItemList, setPurchaseItemList] = useState([]);
  const [onePurchaseItem, setOnePurchaseItem] = useState({});
  const [selected, setSelected] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("purchaseItemList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setPurchaseItemList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`purchaseItemList`, JSON.stringify(data));
    }
  };

  const createPurchaseItem = (data) => {
    setLoading(true);
    RouterApi.createPurchaseItem(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log(resData);
        setPurchaseItemList([...purchaseItemList, resData.purchaseItem]);
        setStorageData([...purchaseItemList, resData.purchaseItem]);
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

  const getAllPurchaseItem = () => {
    setLoading(true);
    RouterApi.getAllPurchaseItem()
      .then((res) => {
        const resData = res;
        // console.log("all PurchaseItem", resData);

        setPurchaseItemList(resData.purchaseItemList);
        setStorageData(resData.purchaseItemList);
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

  const getSinglePurchaseItem = (id) => {
    setLoading(true);
    RouterApi.getSinglePurchaseItem(id)
      .then((res) => {
        const resData = res;
        console.log(resData);

        setOnePurchaseItem(resData);
        setStorageData(resData);
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

    if (name !== "type" && !objForUpdate.hasOwnProperty("type")) {
      setObjForUpdate((prev) => ({ ...prev, type: selected.type }));
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

  const updatePurchaseItem = () => {
    setLoading(true);
    const id = selected.id;

    RouterApi.updatePurchaseItem(objForUpdate, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(purchaseItemList, resData.purchaseItem);
        setPurchaseItemList([...tmpUps]);
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

  const deletePurchaseItem = (id) => {
    setLoading(true);
    RouterApi.deletePurchaseItem(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(purchaseItemList, id);
        setPurchaseItemList([...deleted]);
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
    <PurchaseItemContext.Provider
      value={{
        onePurchaseItem,
        purchaseItemList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,

        createPurchaseItem,
        getAllPurchaseItem,
        getSinglePurchaseItem,
        updatePurchaseItem,
        deletePurchaseItem,
        onChange,
      }}
    >
      {children}
    </PurchaseItemContext.Provider>
  );
};

export default PurchaseItemProvider;
