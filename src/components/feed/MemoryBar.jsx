import { memoryClass } from "../../utils/learning";

export function MemoryBar({ value }) {
  return (
    <span className="memory" aria-label={`Memory strength ${value}%`}>
      <span>memory</span>
      <span className="memory-track">
        <span
          className={`memory-fill ${memoryClass(value)}`}
          style={{ width: `${value}%` }}
        />
      </span>
    </span>
  );
}
