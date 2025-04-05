import classNames from "classnames";
import styles from "./SelectColumn.module.css";
import { select } from "../../../constants/Select";
import { useDispatch, useSelector } from "react-redux";
import { getGroups, groupActions } from "../../../store/group.slice";
import { useCallback, useEffect, useState } from "react";
import Status from "../../Status/Status";

function SelectColumn() {
  const dispatch = useDispatch();
  const status = useSelector((s) => s.groups.commonStatus);
  const activeNode = useSelector((s) => s.groups.selectedNodeId);
  const activeGroups = useSelector((s) => s.groups.selectedNodeGroups);
  const [selectedValue, setSelectedValue] = useState("");

  const fetchData = useCallback(() => {
    dispatch(getGroups()).then(() => {
      if (selectedValue) {
        dispatch(groupActions.filterData(selectedValue));
        dispatch(groupActions.statusFilteredData());
        dispatch(groupActions.activeNodeId());
      }
    });
  }, [dispatch, selectedValue]);

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId);
  }, [fetchData]);

  const handleFilterChange = useCallback(
    (e) => {
      setSelectedValue(e.target.value);
      dispatch(groupActions.filterData(selectedValue));
    },
    [dispatch]
  );

  return (
    <div className={classNames(styles.select_column)}>
      <select
        className={classNames(styles.select_column__groups)}
        name="groups"
        id="group-select"
        onChange={handleFilterChange}
      >
        {select.map((item) => (
          <option
            className={classNames(styles.select_column__option)}
            key={JSON.stringify(item)}
            value={item.value}
          >
            {item.name}
          </option>
        ))}
      </select>
      {status && (
        <div className={classNames(styles.select_column__item)}>
          <p className={classNames(styles.select_column__item_text)}>Статус сервиса: </p>
          <Status status={status}/>
        </div>
      )}
      {activeNode && (
        <div className={classNames(styles.select_column__item)}>
          <p className={classNames(styles.select_column__item_text)}>Группы: {activeGroups.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default SelectColumn;
