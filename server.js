import { serve } from "https://deno.land/std@0.151.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts";

serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  if (req.method === "GET" && pathname === "/tips") {
    
    let tips = ["熱中症の7・8月発生数は、1年のうちの9割を占めています。"];
    tips.push("お酒をたくさん飲んだ翌日は熱中症になりやすいので気を付けましょう。");
    tips.push("めまいがしたとき、涼しい場所へ行き、水分をとりましょう。");
    tips.push("熱中症になった時、脇の下、首、足のつけ根を冷やしましょう。");
    tips.push("熱中症予防のために水分だけでなく、塩分もとりましょう。");
    tips.push("アイスコーヒーは水分補給にあまり適しません。");
    tips.push("暑さ対策として、半裸で過ごすのは紫外線が直接肌に当たったり、汗を吸ってくれないのでよくありません。");
    tips.push("熱中症の発生が最も多い場所は自宅です。");
    tips.push("最も熱中症になりやすい年齢層は高齢者（65歳以上）です。");
    tips.push("人間は入浴中でも汗をかき、水分が失われます。入浴前と後の両方に水分をとりましょう。");
    tips.push("尿の色が濃いめの黄色がついていれば少し多めに水分をとる必要がある状態です。");
    tips.push("経口補水液を作るための材料として水、塩に加えて砂糖が必要です。");
    tips.push("熱中症予防の観点から、黒色の服は熱を吸収しやすいので避けましょう。");
    tips.push("熱中症予防に最も効果的なのは、麦わら帽子です。");

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
