import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../../helper/index";
import { useSnackContext } from "../../snackAlertContext";

const QCPContext = createContext();
export const useElemiQCPContext = () => useContext(QCPContext);

const ElemiQCPProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [qCPList, setQCPList] = useState([]);
  const [oneQCP, setOneQCP] = useState({});
  const [selected, setSelected] = useState({});
  const [jsonObject, setJsonObject] = useState({});

  const [objRow, setObjRow] = useState([]);

  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("eQCPList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setQCPList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`eQCPList`, JSON.stringify(data));
    }
  };

  const createQCP = (data) => {
    setLoading(true);
    RouterApi.createElemiQCP(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log(resData);
        setQCPList([...qCPList, resData.qualityControlParameter]);
        setStorageData([...qCPList, resData.qualityControlParameter]);
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

  const getAllQCP = () => {
    setLoading(true);
    RouterApi.getAllElemiQCP()
      .then((res) => {
        const resData = res;

        setQCPList(resData.qualityControlParameterList);
        setStorageData(resData.qualityControlParameterList);
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

  const getSingleQCP = (id) => {
    setLoading(true);
    RouterApi.getSingleQCP(id)
      .then((res) => {
        const resData = res;
        // console.log(resData);

        setOneQCP(resData);
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
  const onChange = (gname = "", target) => {
    const { name, value, textContent } = target;
    if (name) {
      setSelected((prev) => ({ ...prev, [name]: value }));
      setObjForUpdate((prev) => ({ ...prev, [name]: value }));
    }
    if (gname) {
      setObjForUpdate((prev) => ({ ...prev, [gname]: textContent }));
      setSelected((prev) => ({ ...prev, [gname]: textContent }));
    }
  };

  const onClick = (group, text) => {
    switch (group) {
      case 1:
        objRow[0] = ["1", "scent", text];
        break;
      case 2:
        objRow[1] = ["2", "color", text];
        break;
      case 3:
        objRow[2] = ["3", "hardnessOrSoftness", text];
        break;
      case 4:
        objRow[3] = ["4", "stickyness", text];
        break;
      case 5:
        objRow[4] = ["5", "presenceOfWoodBarks", text];
        break;
      case 6:
        objRow[5] = ["6", "presenceOfBorax", text];
        break;
      case 7:
        objRow[6] = ["7", "molds", text];
        break;
      // default:
      // code block
    }
    setSelected((prev) => ({ ...prev, cell: [group, text], tblRows: objRow }));
    setObjForUpdate((prev) => ({ ...prev, tblRows: objRow }));
  };

  const updateList = (list, data) => {
    var tmplist = list;
    Object.assign(
      tmplist.find((item) => item.id === data.id),
      { ...data }
    );
    return tmplist;
  };

  const updateQCP = () => {
    setLoading(true);
    const id = selected.id;

    RouterApi.updateElemiQCP(objForUpdate, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(qCPList, resData.qualityControlParameter);
        setQCPList([...tmpUps]);
        setStorageData([...tmpUps]);
        setObjRow([]);
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

  const deleteQCP = (id) => {
    setLoading(true);
    RouterApi.deleteElemiQCP(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(qCPList, id);
        setQCPList([...deleted]);
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
    <QCPContext.Provider
      value={{
        oneQCP,
        qCPList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,
        jsonObject,
        setJsonObject,

        createQCP,
        getAllQCP,
        getSingleQCP,
        updateQCP,
        deleteQCP,
        onChange,
        onClick,
      }}
    >
      {children}
    </QCPContext.Provider>
  );
};

export default ElemiQCPProvider;
