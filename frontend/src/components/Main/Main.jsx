import classNames from "classnames";
import styles from "./Main.module.css";
import SelectColumn from "../Columns/SelectColumn/SelectColumn";
import NodesColumn from "../Columns/NodesColumn/NodesColumns";
import DescriptionColumn from "../Columns/DescriptionColumn/DescriptionColumn";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

function Main() {
  const status = useSelector((s) => s.groups.status);

  return (
    <div
      className={classNames(styles.main, {
        [styles.not_succeeded]: status !== "succeeded",
      })}
    >
      <SelectColumn />
      {status == "loading" && <Loading/>}
      {status == "failed" && (
        <div className={classNames(styles.error)}>Что-то пошло не так</div>
      )}
      {status == "succeeded" && (
        <>
          <NodesColumn />
          <DescriptionColumn />
        </>
      )}
    </div>
  );
}

export default Main;
