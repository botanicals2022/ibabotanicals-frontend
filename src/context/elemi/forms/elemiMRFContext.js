import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../../helper/index";
import { useSnackContext } from "../../snackAlertContext";

const MRFContext = createContext();
export const useElemiMRFContext = () => useContext(MRFContext);

const ElemiMRFProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [mRFList, setMRFList] = useState([]);
  const [oneMRF, setOneMRF] = useState({});
  const [selected, setSelected] = useState({});
  const [objTbl, setObjTbl] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("elemiMRFList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setMRFList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`elemiMRFList`, JSON.stringify(data));
    }
  };

  const createMRF = (data) => {
    setLoading(true);
    RouterApi.createElemiMRF(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log("materialRequestForm here", resData);
        setMRFList([...mRFList, resData.materialRequestForm]);
        setStorageData([...mRFList, resData.materialRequestForm]);
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

  const getAllMRF = () => {
    setLoading(true);
    RouterApi.getAllElemiMRF()
      .then((res) => {
        const resData = res;

        setMRFList(resData.materialRequestFormList);
        setStorageData(resData.materialRequestFormList);
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

  const getSingleMRF = (id) => {
    setLoading(true);
    RouterApi.getSingleMRF(id)
      .then((res) => {
        const resData = res;
        console.log(resData);

        setOneMRF(resData);
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
      cellObj().forEach((item, index) => {
        tmpQnty += parseFloat(item[`weight_${index}`]) ?? 0;
      });

      setObjForUpdate((prev) => ({ ...prev, totalWeight: tmpQnty }));
      setSelected((prev) => ({ ...prev, totalWeight: tmpQnty }));
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

  const updateMRF = () => {
    setLoading(true);
    const id = selected.id;
    delete objForUpdate.tblRows;

    RouterApi.updateElemiMRF({ ...objForUpdate, tblRows: objTbl }, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(mRFList, resData.materialRequestForm);
        setMRFList([...tmpUps]);
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

  const deleteMRF = (id) => {
    setLoading(true);
    RouterApi.deleteElemiMRF(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(mRFList, id);
        setMRFList([...deleted]);
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
    <MRFContext.Provider
      value={{
        oneMRF,
        mRFList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,
        objTbl,
        setObjTbl,

        createMRF,
        getAllMRF,
        getSingleMRF,
        updateMRF,
        deleteMRF,
        onChange,
      }}
    >
      {children}
    </MRFContext.Provider>
  );
};

export default ElemiMRFProvider;
