import type { SVGProps } from "react";

import { ExternalLink } from "./ExternalLink";
import { GitHub } from "./GitHub";
import { LinkedIn } from "./LinkedIn";

type IconProps = {
  name?: string;
} & SVGProps<SVGSVGElement>;

export const Icon = ({ name, ...props }: IconProps) => {
  switch (name) {
    case "github":
      return <GitHub {...props} />;
    case "linkedin":
      return <LinkedIn {...props} />;
    default:
      return <ExternalLink {...props} />;
  }
};
