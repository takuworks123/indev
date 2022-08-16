import { serve } from "https://deno.land/std@0.151.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts";

serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  if (req.method === "GET" && pathname === "/tips") {
    
    let tips = ["お役立ち情報！！！！1"];
    tips.push("お役立ち情報！！！！2");
    tips.push("お役立ち情報！！！！3");
    tips.push("お役立ち情報！！！！4");

    return new Response(tips[Math.floor(Math.random() * tips.length)]);

    //return new Response("teeeeeeest");
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
