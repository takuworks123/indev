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
    tips.push("暑さ対策として半裸で過ごすのは、紫外線が直接肌に当たったり、汗を吸ってくれないのでよくありません。");
    tips.push("熱中症の発生が最も多い場所は自宅です。");
    tips.push("最も熱中症になりやすい年齢層は高齢者（65歳以上）です。");
    tips.push("人間は入浴中でも汗をかき、水分が失われます。入浴前と後の両方に水分をとりましょう。");
    tips.push("尿の色が濃いめの黄色がついていれば少し多めに水分をとる必要がある状態です。");
    tips.push("経口補水液を作るための材料として水、塩に加えて砂糖が必要です。");
    tips.push("熱中症予防の観点から、黒色の服は熱を吸収しやすいので避けましょう。");
    tips.push("熱中症予防に最も効果的なのは、麦わら帽子です。");
    tips.push("休憩を一回で済まさず、小分けにしましょう。");

    return new Response(tips[Math.floor(Math.random() * tips.length)]);
  }

  function initMap() {
    var opts = {
      zoom: 15,
      center: new google.maps.LatLng(35.6807527,139.7670716)
    };
    var map = new google.maps.Map(document.getElementById("map"), opts);
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
