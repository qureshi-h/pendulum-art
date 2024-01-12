import { CiPause1 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";

import styles from "../FlashIcon.module.css";

const Status = (props: { paused: boolean }) => {
    return (
        <div className={styles.container}>
            {props.paused ? (
                <CiPause1 className={`${styles.icon} ${styles.flash}`} />
            ) : (
                <CiPlay1 className={`${styles.icon} ${styles.flash}`} />
            )}
        </div>
    );
};

export default Status;
