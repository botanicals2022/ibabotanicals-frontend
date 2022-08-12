import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../helper/index";
import { useSnackContext } from "../snackAlertContext";

const ExtractedElemiContext = createContext();
export const useExtractedElemiContext = () => useContext(ExtractedElemiContext);

const ExtractedElemiProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [extractedList, setExtractedList] = useState([]);
  const [oneExtracted, setOneExtracted] = useState({});
  const [selected, setSelected] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("elemiExtractedList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setExtractedList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`elemiExtractedList`, JSON.stringify(data));
    }
  };

  const createExtracted = (data) => {
    RouterApi.createExtractedElemi(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        setExtractedList([...extractedList, resData.extracted]);
        setStorageData([...extractedList, resData.extracted]);
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

  const getAllExtracted = () => {
    RouterApi.getAllExtractedElemi()
      .then((res) => {
        const resData = res;

        setExtractedList(resData.extractedList);
        setStorageData(resData.extractedList);
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

  const getSingleExtracted = (id) => {
    RouterApi.getSingleExtracted(id)
      .then((res) => {
        const resData = res;
        console.log(resData);

        setOneExtracted(resData.extracted);
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
    console.log(target);
    setSelected((prev) => ({ ...prev, [name]: value }));
    setObjForUpdate((prev) => ({ ...prev, [name]: value }));
  };

  const updateList = (list, data) => {
    var tmplist = list;
    Object.assign(
      tmplist.find((item) => item.id === data.id),
      { ...data }
    );
    return tmplist;
  };

  const updateExtracted = () => {
    const id = selected.id;
    RouterApi.updateExtractedElemi(objForUpdate, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(extractedList, resData.extracted);
        setExtractedList([...tmpUps]);
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

  const deleteExtracted = (id) => {
    RouterApi.deleteExtractedElemi(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(extractedList, id);
        setExtractedList([...deleted]);
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
    <ExtractedElemiContext.Provider
      value={{
        oneExtracted,
        extractedList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,

        createExtracted,
        getAllExtracted,
        getSingleExtracted,
        updateExtracted,
        deleteExtracted,
        onChange,
      }}
    >
      {children}
    </ExtractedElemiContext.Provider>
  );
};

export default ExtractedElemiProvider;
