import * as React from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const formatLabel = (segment: string) =>
  segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const CommonBreadcrumbs: React.FC = () => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x); // remove empty strings

  return (
    <Breadcrumbs separator={<Typography fontWeight={500}>/</Typography>}>
      <Link underline="hover" color="inherit" component={RouterLink} to="/">
        <Typography variant="caption">HOME</Typography>
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography variant="caption" key={to}>
            {formatLabel(value).toUpperCase()}
          </Typography>
        ) : (
          <Link
            key={to}
            underline="hover"
            color="inherit"
            component={RouterLink}
            to={to}
          >
            <Typography variant="caption">
              {formatLabel(value).toUpperCase()}
            </Typography>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default CommonBreadcrumbs;
