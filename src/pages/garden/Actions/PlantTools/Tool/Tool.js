import { ApDragDrop } from "components";
import clsx from "clsx";
import { useState } from "react";
import styles from "./Tool.module.scss";

const Tool = ({ name, uses, onUse }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className={styles.container}>
      <div
        className={clsx(styles.frame, {
          [styles.frameWithItemGrabbing]: isDragging,
          [styles.frameWithItemOutOfUses]: uses === 0,
        })}
      />
      <ApDragDrop
        data={{ tool: name, useTool: onUse }}
        canDrag={() => uses !== 0}
        onDragStart={() => setIsDragging(true)}
        onDrop={() => setIsDragging(false)}
      >
        <div
          style={{ backgroundImage: `url("/sprites/tools/${name}.png")` }}
          className={clsx(styles.item, { [styles.itemOutOfUses]: uses === 0 })}
        />
      </ApDragDrop>
      {uses !== undefined && <div className={clsx(styles.uses, { [styles.usesOutOfUses]: uses === 0 })}>{uses}</div>}
    </div>
  );
};

export default Tool;
