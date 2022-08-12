import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../../helper/index";
import { useSnackContext } from "../../snackAlertContext";

const TFLContext = createContext();
export const useElemiTFLContext = () => useContext(TFLContext);

const ElemiTFLProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [tFLList, setTFLList] = useState([]);
  const [oneTFL, setOneTFL] = useState({});
  const [selected, setSelected] = useState({});
  const [objTbl, setObjTbl] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("elemiTFLList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setTFLList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`elemiTFLList`, JSON.stringify(data));
    }
  };

  const createTFL = (data) => {
    setLoading(true);
    RouterApi.createElemiTFL(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log("transmittalForLaboratory here", resData);
        setTFLList([...tFLList, resData.transmittalForLaboratory]);
        setStorageData([...tFLList, resData.transmittalForLaboratory]);
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

  const getAllTFL = () => {
    setLoading(true);
    RouterApi.getAllElemiTFL()
      .then((res) => {
        const resData = res;

        setTFLList(resData.transmittalForLaboratoryList);
        setStorageData(resData.transmittalForLaboratoryList);
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

  const getSingleTFL = (id) => {
    setLoading(true);
    RouterApi.getSingleTFL(id)
      .then((res) => {
        const resData = res;
        console.log(resData);

        setOneTFL(resData);
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

      let tmpHydrosol = 0;
      let tmpPurifiedOil = 0;
      cellObj().forEach((item, index) => {
        tmpHydrosol += parseFloat(item[`hydrosol_${index}`]) ?? 0;
        tmpPurifiedOil += parseFloat(item[`purified_oil_${index}`]) ?? 0;
      });

      setObjForUpdate((prev) => ({
        ...prev,
        totalHydrosol: tmpHydrosol,
        totalPurifiedOil: tmpPurifiedOil,
      }));
      setSelected((prev) => ({
        ...prev,
        totalHydrosol: tmpHydrosol,
        totalPurifiedOil: tmpPurifiedOil,
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

  const updateTFL = () => {
    setLoading(true);
    const id = selected.id;
    delete objForUpdate.tblRows;

    RouterApi.updateElemiTFL({ ...objForUpdate, tblRows: objTbl }, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(tFLList, resData.transmittalForLaboratory);
        setTFLList([...tmpUps]);
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

  const deleteTFL = (id) => {
    setLoading(true);
    RouterApi.deleteElemiTFL(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(tFLList, id);
        setTFLList([...deleted]);
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
    <TFLContext.Provider
      value={{
        oneTFL,
        tFLList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,
        objTbl,
        setObjTbl,

        createTFL,
        getAllTFL,
        getSingleTFL,
        updateTFL,
        deleteTFL,
        onChange,
      }}
    >
      {children}
    </TFLContext.Provider>
  );
};

export default ElemiTFLProvider;
