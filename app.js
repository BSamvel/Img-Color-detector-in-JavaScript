// function newEl(tag){return document.createElement(tag)}

window.addEventListener('load', onDocLoaded, false);
function onDocLoaded(evt)
{

    let img = new Image();
        img.src = 'karmir2.jpg';
    
        // WAIT TILL IMAGE IS LOADED.
        img.onload = function () {
            fill_canvas(img);       // FILL THE CANVAS WITH THE IMAGE.
        }
    
        function fill_canvas(img) {
            // CREATE CANVAS CONTEXT.
            let ctx = canvas.getContext('2d');
    
            canvas.width = img.width;
            canvas.height = img.height;
    
            ctx.drawImage(img, 0, 0);       // DRAW THE IMAGE TO THE CANVAS.
        }

    canvas.addEventListener('mousemove', getColorFromWheel);

}

var convertToHsl = function convertToHsl(rgbArr) {
  var r1 = Number(rgbArr[0]) / 255, g1 = Number(rgbArr[1]) / 255, b1 = Number(rgbArr[2]) / 255;
  var maxColor = Math.max(r1,g1,b1), minColor = Math.min(r1,g1,b1);
  var L = (maxColor + minColor) / 2 , S = 0, H = 0;
  if(maxColor != minColor){
    if(L < 0.5){
      S = (maxColor - minColor) / (maxColor + minColor);
    }else{
      S = (maxColor - minColor) / (2.0 - maxColor - minColor);
    }
    if(r1 == maxColor){
      H = (g1-b1) / (maxColor - minColor);
    }else if(g1 == maxColor){
      H = 2.0 + (b1 - r1) / (maxColor - minColor);
    }else{
      H = 4.0 + (r1 - g1) / (maxColor - minColor);
    }
  }
  L = L * 100;
  S = S * 100;
  H = H * 60;
  if(H<0){
    H += 360;
  }
  return {h:H, s:S, l:L};
}

var getColorNameFromHsl = function (hsl) {
        var l = Math.floor(hsl.l), s = Math.floor(hsl.s), h = Math.floor(hsl.h);
            if (s <= 10 && l >= 90) {
            return ("White")
        } else if ((s <= 10 && l <= 70) || s === 0) {
            return ("Black")
        } else if (l <= 15) {
            return ("Black")
        } else if ((h >= 0 && h <= 15) || h >= 346) {
            return ("Red");
        } else if (h >= 16 && h <= 35) {
            if (s < 90) {
                return ("Brown");
            } else {
                return ("Orange");
            }
        } else if (h >= 36 && h <= 54) {
            if (s < 90) {
                return ("Brown");
            } else {
                return ("Yellow");
            }
        } else if (h >= 55 && h <= 165) {
            return ("Green");
        } else if (h >= 166 && h <= 260) {
            return ("Blue")
        } else if (h >= 261 && h <= 290) {
            return ("Purple")
        } else if (h >= 291 && h <= 345) {
            return ("Pink")
        }


    




    }

var hsv2rgb = function(hsv) {
  var h = hsv.hue, s = hsv.sat, v = hsv.val;
  var rgb, i, data = [];
  if (s === 0) {
    rgb = [v,v,v];
  } else {
    h = h / 60;
    i = Math.floor(h);
    data = [v*(1-s), v*(1-s*(h-i)), v*(1-s*(1-(h-i)))];
    switch(i) {
      case 0:
        rgb = [v, data[2], data[0]];
        break;
      case 1:
        rgb = [data[1], v, data[0]];
        break;
      case 2:
        rgb = [data[0], v, data[2]];
        break;
      case 3:
        rgb = [data[0], data[1], v];
        break;
      case 4:
        rgb = [data[2], data[0], v];
        break;
      default:
        rgb = [v, data[0], data[1]];
        break;
    }
  }
  return rgb;
};




// function clamp(min, max, val)
// {
//     if (val < min) return min;
//     if (val > max) return max;
//     return val;
// }


// function makeColorWheel(diameter)
// {
//     var can = newEl('canvas');
//     var ctx = can.getContext('2d');
//     can.width = diameter;
//     can.height = diameter;
//     var imgData = ctx.getImageData(0,0,diameter,diameter);
//     var maxRange = diameter / 2;
    
//     for (var y=0; y<diameter; y++)
//     {
//         for (var x=0; x<diameter; x++)
//         {
//             var xPos = x - (diameter/2);
//             var yPos = (diameter-y) - (diameter/2);
            
            
//             var polar = pos2polar( {x:xPos, y:yPos} );
//             var sat = clamp(0,1,polar.len / ((maxRange/2)));
//             var val = clamp(0,1, (maxRange-polar.len) / (maxRange/2) );
            
//             var rgb = hsv2rgb( {hue:polar.ang, sat:sat, val:val} );
            
//             var index = 4 * (x + y*diameter);
//             imgData.data[index + 0] = rgb[0]*255;
//             imgData.data[index + 1] = rgb[1]*255;
//             imgData.data[index + 2] = rgb[2]*255;
//             imgData.data[index + 3] = 255;
//         }
//     }
//     ctx.putImageData(imgData, 0,0);
//     return can;
// }

// function deg2rad(deg)
// {
//     return (deg / 360) * ( 2 * Math.PI );
// }
// function rad2deg(rad)
// {
//     return (rad / (Math.PI * 2)) * 360;
// }

// function pos2polar(inPos)
// {
//     var vecLen = Math.sqrt( inPos.x*inPos.x + inPos.y*inPos.y );
//     var something = Math.atan2(inPos.y,inPos.x);
//     while (something < 0)
//         something += 2*Math.PI;
        
//     return { ang: rad2deg(something), len: vecLen };
// }



function getColorFromWheel(event) 
{
  var can = this;
  var ctx = can.getContext('2d');
  var color = document.getElementById('color');
    
  var x = event.layerX;
  var y = event.layerY;
  var pixel = ctx.getImageData(x, y, 1, 1);
  var data = pixel.data;
  var rgba = 'rgba(' + data[0] + ',' + data[1] +
             ',' + data[2] + ',' + (data[3] / 255) + ')';
  colorName.style.background =  rgba;
  var rgbArray = [data[0], data[1], data[2]];
  var color = getColorNameFromHsl(convertToHsl(rgbArray));
  colorName.textContent = color;
  // console.log(color);
}