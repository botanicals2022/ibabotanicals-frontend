import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../helper/index";
import { useSnackContext } from "../snackAlertContext";

const LaboratoryContext = createContext();
export const useElemiLaboratoryContext = () => useContext(LaboratoryContext);

const ElemiLaboratoryProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [laboratoryList, setLaboratoryList] = useState([]);
  const [oneLaboratory, setOneLaboratory] = useState({});
  const [selected, setSelected] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("elemiLaboratoryList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setLaboratoryList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`elemiLaboratoryList`, JSON.stringify(data));
    }
  };

  const createLaboratory = (data) => {
    setLoading(true);
    RouterApi.createElemiLaboratory(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log(resData);
        setLaboratoryList([...laboratoryList, resData.laboratory]);
        setStorageData([...laboratoryList, resData.laboratory]);
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

  const getAllLaboratory = () => {
    setLoading(true);
    RouterApi.getAllElemiLaboratory()
      .then((res) => {
        const resData = res;

        // console.log("elemi laboratory", res);

        setLaboratoryList(resData.laboratories);
        setStorageData(resData.laboratories);
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

  const getSingleLaboratory = (id) => {
    setLoading(true);
    RouterApi.getSingleLaboratory(id)
      .then((res) => {
        const resData = res;
        // console.log(resData);
        setOneLaboratory(resData);
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

  const updateLaboratory = () => {
    setLoading(true);
    const id = selected.id;
    RouterApi.updateElemiLaboratory(objForUpdate, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(laboratoryList, resData.laboratory);
        setLaboratoryList([...tmpUps]);
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

  const deleteLaboratory = (id) => {
    setLoading(true);
    RouterApi.deleteElemiLaboratory(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(laboratoryList, id);
        setLaboratoryList([...deleted]);
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
    <LaboratoryContext.Provider
      value={{
        oneLaboratory,
        laboratoryList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,

        createLaboratory,
        getAllLaboratory,
        getSingleLaboratory,
        updateLaboratory,
        deleteLaboratory,
        onChange,
      }}
    >
      {children}
    </LaboratoryContext.Provider>
  );
};

export default ElemiLaboratoryProvider;
