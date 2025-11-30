import Tooltip from '@mui/material/Tooltip';
import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

type FontAwesomeIconWithTooltip = {
  tooltip: string;
} & FontAwesomeIconProps;

export default function FontAwesomeIconWithTooltip({
  tooltip,
  ...rest
}: FontAwesomeIconWithTooltip) {
  return (
    <Tooltip className="cursor-pointer" title={tooltip} placement="top">
      <span>
        <FontAwesomeIcon {...rest} />
      </span>
    </Tooltip>
  );
}
