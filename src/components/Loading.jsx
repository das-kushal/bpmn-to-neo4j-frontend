import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <div style={{ padding: "1em" }}>
      <Skeleton height={650} width={50} />
      <span
        style={{
          display: "flex",
          justifyContent: "flex-start",
          padding: 4,
          gap: 10,
          position: "absolute",
          bottom: 10,
          left: 10,
        }}
      >
        <Skeleton height={40} width={40} />
        <Skeleton height={40} width={40} />
        <Skeleton height={40} width={40} />
        <Skeleton height={40} width={40} />
      </span>
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          // width: "10vw",
          justifyContent: "flex-end",
          position: "absolute",
          bottom: "3em",
          right: "2px",
          padding: "1em",
          gap: "1px",
        }}
      >
        <Skeleton height={40} width={40} />
        <Skeleton height={40} width={40} />
        <Skeleton height={40} width={40} />
      </span>
      <span style={{ position: "absolute", right: "10px", bottom: "10px" }}>
        <Skeleton width={100} height={30} />
      </span>
    </div>
  );
}
