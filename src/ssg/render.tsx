import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { SsgRoutes } from "@/routes/ssg-routes";

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <SsgRoutes />
    </StaticRouter>,
  );
}
