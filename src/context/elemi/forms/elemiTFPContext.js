import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../../helper/index";
import { useSnackContext } from "../../snackAlertContext";

import IsObjEmpty from "../../../plugins/empty-object";

const TFPContext = createContext();
export const useElemiTFPContext = () => useContext(TFPContext);

const ElemiTFPProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [tFPList, setTFPList] = useState([]);
  const [oneTFP, setOneTFP] = useState({});
  const [selected, setSelected] = useState({});
  const [objTbl, setObjTbl] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("elemiTFPList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setTFPList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`elemiTFPList`, JSON.stringify(data));
    }
  };

  const createTFP = (data) => {
    setLoading(true);
    RouterApi.createElemiTFP(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log("material here", resData);
        setTFPList([...tFPList, resData.transmittalForProduction]);
        setStorageData([...tFPList, resData.transmittalForProduction]);
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

  const getAllTFP = () => {
    setLoading(true);
    RouterApi.getAllElemiTFP()
      .then((res) => {
        const resData = res;

        setTFPList(resData.transmittalForProductionList);
        setStorageData(resData.transmittalForProductionList);
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

  const getSingleTFP = (id) => {
    setLoading(true);
    RouterApi.getSingleTFP(id)
      .then((res) => {
        const resData = res;
        console.log(resData);

        setOneTFP(resData);
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
  const onChange = (gname, target) => {
    const { name, value, textContent } = target;
    if (name) {
      setSelected((prev) => ({ ...prev, [name]: value }));
      setObjForUpdate((prev) => ({ ...prev, [name]: value }));
    }
    if (gname) {
      let indx = gname.replace(/\D+/gi, "");

      const cellObj = () => {
        const tmpUpd = () => {
          return { ...objTbl[indx], id: parseInt(indx), [gname]: textContent };
        };
        return updateList(objTbl, tmpUpd());
      };

      let tmpQnty = 0;
      let tmpCntnr = 0;
      cellObj().forEach((item, index) => {
        tmpQnty += parseFloat(item[`quantity_${index}`]) ?? 0;
        tmpCntnr += parseFloat(item[`number_of_containers_${index}`]) ?? 0;
      });

      setObjForUpdate((prev) => ({
        ...prev,
        totalQuantity: tmpQnty,
        totalContainer: tmpCntnr,
      }));
      setSelected((prev) => ({
        ...prev,
        totalQuantity: tmpQnty,
        totalContainer: tmpCntnr,
      }));
      setObjTbl([...cellObj()]);
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

  const updateTFP = () => {
    setLoading(true);
    const id = selected.id;
    delete objForUpdate.tblRows;

    RouterApi.updateElemiTFP({ ...objForUpdate, tblRows: objTbl }, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(tFPList, resData.transmittalForProduction);
        setTFPList([...tmpUps]);
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

  const deleteTFP = (id) => {
    setLoading(true);
    RouterApi.deleteElemiTFP(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(tFPList, id);
        setTFPList([...deleted]);
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
    <TFPContext.Provider
      value={{
        oneTFP,
        tFPList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,
        objTbl,
        setObjTbl,

        createTFP,
        getAllTFP,
        getSingleTFP,
        updateTFP,
        deleteTFP,
        onChange,
      }}
    >
      {children}
    </TFPContext.Provider>
  );
};

export default ElemiTFPProvider;
