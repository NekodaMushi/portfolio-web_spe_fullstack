// Documentation.tsx

import IconCloud from "@/components/ui/icon-cloud";
import { useTheme } from "next-themes";
import React, { useEffect, useMemo, useState } from "react";
import cloudIcons from "@/components/documentation/cloud-icons";

const Documentation = () => {
  return (
    <div>
      <div className="z-10">
        <IconCloud iconSlugs={cloudIcons} />
      </div>
      <div className="z-0"></div>
    </div>
  );
};

export default Documentation;
