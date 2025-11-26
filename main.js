var c = document.getElementById("c")
var ctx = c.getContext("2d");
var cw = c.width = 500;
var ch = c.height = 500;
var cx = cw / 2,  cy = ch / 2;
var rad = Math.PI / 180;
var howMany = 500;
var p = [];
var colors = ["242,41,41", "222,80,80", "247,111,111", "255,145,145", "252,199,199"];
ctx.strokeStyle = "white";
ctx.globalAlpha = .7;

// Переменные для эффекта печатной машинки
var topText = "Я люблю тебя,прости пожалуйста";
var bottomText = "Но лучше я сто раз попробую с тобой,чем с кемто другим";
var currentTopText = "";
var currentBottomText = "";
var topTextIndex = 0;
var bottomTextIndex = 0;
var typingSpeed = 200; // скорость печати в миллисекундах
var lastTypingTime = 0;
var topTextY = 80; // позиция Y верхнего текста
var bottomTextY = 470; // позиция Y нижнего текста
var textSize = 20; // размер шрифта
 
function particles()
{
  this.r = randomIntFromInterval(2, 12);
  var innerR = Math.round(Math.random() * 130) + 1;
  var innerA = Math.round(Math.random() * 360) + 1;
  this.x = cx + innerR * Math.cos(innerA * rad);
  this.y = cy + 20 + innerR * Math.sin(innerA * rad);
  this.ix = (Math.random()) * (Math.random() < 0.5 ? -1 : 1);
  this.iy = (Math.random()) * (Math.random() < 0.5 ? -1 : 1);
  this.alpha = Math.random();
  this.c = "rgba(" + colors[Math.round(Math.random() * colors.length) + 1] + "," + this.alpha + ")";
}
 
for (var i = 0; i < howMany; i++)
{
  p[i] = new particles();
}
 
function Draw(timestamp)
{
  // Убрал эффект тени - теперь просто белый фон
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cw, ch);
  
  // Рисуем текст печатной машинкой
  drawTypewriterText(timestamp);
  
  for (var i = 0; i < p.length; i++)
{
    ctx.fillStyle = p[i].c;
    //Текущий путь для isPointInPath
    thePath(p[i].r);
 
    if (ctx.isPointInPath(p[i].x, p[i].y))
{
      p[i].x += p[i].ix;
      p[i].y += p[i].iy;
      ctx.beginPath();
      ctx.arc(p[i].x, p[i].y, p[i].r, 0, 2 * Math.PI);
      ctx.fill();
 
    } else {
      p[i].ix = -1 * p[i].ix;
      p[i].iy = -1 * p[i].iy;
      p[i].x += p[i].ix;
      p[i].y += p[i].iy;
    }
  }
  window.requestAnimationFrame(Draw);
}
window.requestAnimationFrame(Draw);
 
function thePath(r)
{
  //Рисуем наше сердце
  ctx.beginPath();
  ctx.moveTo(250, 200);
  ctx.arc(350, 200, 100 - r, Math.PI, Math.PI * 0.23);
  ctx.lineTo(250, 450);
  ctx.arc(150, 200, 100 - r, Math.PI * 0.77, 0);
}
 
function randomIntFromInterval(mn, mx)
{
  return ~~(Math.random() * (mx - mn + 1) + mn);
}

// Функция для эффекта печатной машинки
function drawTypewriterText(timestamp) {
  if (!lastTypingTime) lastTypingTime = timestamp;
  
  // Добавляем новую букву для верхнего текста
  if (timestamp - lastTypingTime > typingSpeed && topTextIndex < topText.length) {
    currentTopText += topText.charAt(topTextIndex);
    topTextIndex++;
    lastTypingTime = timestamp;
  }
  // Когда верхний текст напечатан, начинаем нижний
  else if (timestamp - lastTypingTime > typingSpeed && bottomTextIndex < bottomText.length) {
    currentBottomText += bottomText.charAt(bottomTextIndex);
    bottomTextIndex++;
    lastTypingTime = timestamp;
  }
  
  // Рисуем верхний текст
  if (currentTopText.length > 0) {
    ctx.font = "bold " + textSize + "px Arial";
    ctx.fillStyle = "rgba(242,41,41,1)"; // Яркий красный цвет
    ctx.textAlign = "center";
    ctx.fillText(currentTopText, cx, topTextY);
  }
  
  // Рисуем нижний текст
  if (currentBottomText.length > 0) {
    ctx.font = "bold " + textSize + "px Arial";
    ctx.fillStyle = "rgba(242,41,41,1)"; // Яркий красный цвет
    ctx.textAlign = "center";
    
    // Разбиваем длинный текст на две строки для лучшего отображения
    var words = currentBottomText.split(',');
    if (words.length > 1) {
      ctx.fillText(words[0] + ',', cx, bottomTextY - 15);
      ctx.fillText(words[1], cx, bottomTextY + 15);
    } else {
      ctx.fillText(currentBottomText, cx, bottomTextY);
    }
  }
}