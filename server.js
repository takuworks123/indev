import { serve } from "https://deno.land/std@0.138.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.138.0/http/file_server.ts";

let previousWord = "しりとり";
let wordLog = [];

console.log("Listening on http://localhost:8000");
serve(async (req) => {
  const pathname = new URL(req.url).pathname;

  if (req.method === "GET" && pathname === "/shiritori") {
    return new Response(previousWord);
  }
  if (req.method === "POST" && pathname === "/shiritori") {
    const requestJson = await req.json();
    const nextWord = requestJson.nextWord;
    let errorLog;
    
    if (wordLog.includes(nextWord)) {
      errorLog = "同じ単語がすでに送信されています。";
    }
    if (nextWord.length < 1) {
      errorLog = "文字を入力してください。";
    }
    if (previousWord.charAt(previousWord.length - 1) !== nextWord.charAt(0)) {
      errorLog = "前の単語に続いていません。";
    }
    
    if (errorLog.length > 0) {
      return new Response(errorLog, { status: 400 });
    }
    
    wordLog.push(nextWord);
    previousWord = nextWord;
    return new Response(previousWord);
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
