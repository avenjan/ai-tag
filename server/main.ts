import { bodyParser, cors, Koa, logger, proxy, Router } from "./deps.ts";
import { tagsRouter } from "./router/tags.ts";

const app = new Koa();
const router = new Router();
router.use("/tags", tagsRouter.routes(), tagsRouter.allowedMethods())
  .get(
    "/",
    (ctx) => {
      ctx.body = "hellow";
    },
  );
app.use(logger())
  .use(cors({
    origin: "*",
  }))
  .use(
    bodyParser(),
  )
  .use(proxy("/openai", {
    target: "https://api.openai.com",
    changeOrigin: true,
    rewrite: (path) => path.replace("/openai", ""),
    logs: true,
  }))
  .use(router.routes()).use(router.allowedMethods());

app.listen(80, () => {
  console.log("服务启动了");
});
