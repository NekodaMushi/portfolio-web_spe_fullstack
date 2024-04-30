import { clsx } from "clsx";

type BarProps = {
  color: string;
  percentage: number;
  count: number;
  label: string;
};

const Bar = (props: BarProps) => {
  const { color, percentage, count, label } = props;

  const barStyle = {
    height: `${percentage}%`,
  };

  const barBgClasses: Record<string, string> = {
    green: "bg-green-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex h-40 items-end justify-end">
        <div
          className={clsx(
            barBgClasses[color],
            "w-14 rounded-xl border-2 border-black",
          )}
          style={barStyle}
        ></div>
      </div>
      <p className="mt-2 text-lg">{count}</p>
      <p className="text-sm">{label}</p>
    </div>
  );
};

export default Bar;
