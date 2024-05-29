import React from "react";

function DotLoader() {
  return (
    <div>
      <div>
        <div className="grid gap-2">
          <div className="flex animate-pulse items-center justify-center space-x-2">
            {" "}
            Loading{" "}
            <div className=" ml-2 h-2 w-2 rounded-full bg-gray-200"></div>
            <div className="h-2 w-2 rounded-full bg-gray-200"></div>
            <div className="h-2 w-2 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DotLoader;
