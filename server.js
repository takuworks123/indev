import { serve } from "https://deno.land/std@0.138.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.138.0/http/file_server.ts";

let firstWord = ["りす", "すいか", "かい", "いえ", "えび"];
let previousWord, wordLog;

function shiritoriReset() {
  previousWord = firstWord[Math.floor(Math.random() * firstWord.length)];
  wordLog = [];
  wordLog.push(previousWord);
}

shiritoriReset();

console.log("Listening on http://localhost:8000");
serve(async (req) => {
  const pathname = new URL(req.url).pathname;

  if (req.method === "GET" && pathname === "/shiritori") {
    return new Response(previousWord);
  }
  if (req.method === "POST" && pathname === "/shiritori") {
    const requestJson = await req.json();
    const nextWord = requestJson.nextWord;
    let errorLog = null;
    
    if (wordLog.includes(nextWord)) {
      errorLog = "同じ単語がすでに送信されています。";
    }
    else if (nextWord.length < 1) {
      errorLog = "文字を入力してください。";
    }
    else if (previousWord.charAt(previousWord.length - 1) !== nextWord.charAt(0)) {
      errorLog = "前の単語に続いていません。";
    }
    else if (nextWord.charAt(nextWord.length - 1) == 'ん') {
      shiritoriReset();
      return new Response(previousWord, { status: 300 });
    }
    
    if (errorLog !== null) {
      return new Response(errorLog, { status: 400 });
    }
    
    wordLog.push(nextWord);
    previousWord = nextWord;
    return new Response(previousWord);
  }
  
  else if (req.method === "RESET" && pathname === "/shiritori") {
    shiritoriReset();
    return new Response(previousWord);
  }
  
  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
