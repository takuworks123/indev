import { serve } from "https://deno.land/std@0.138.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.138.0/http/file_server.ts";

let previousWord = "しりとり";

console.log("Listening on http://localhost:8000");
serve(async (req) => {
  const pathname = new URL(req.url).pathname;

  if (req.method === "GET" && pathname === "/shiritori") {
    return new Response(previousWord);
  }
  if (req.method === "POST" && pathname === "/shiritori") {
    const requestJson = await req.json();
    const nextWord = requestJson.nextWord;
    let flg = 0, nextlen;
    
    nextlen = nextWord.length;
    
    //return new Response(`${nextWord.length}`, { status: 400 });
    
    if ( nextlen <= 1 ) {
      flg = 1;
    }
    if ( previousWord.charAt(previousWord.length - 1) !== nextWord.charAt(0) ) {
      flg = 1;
    }
    
    if ( flg == 1 ) {
      return new Response("前の単語に続いていません。" + nextlen, { status: 400 });
    }
    
    //previousWord = nextWord;
    return new Response(previousWord);
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
